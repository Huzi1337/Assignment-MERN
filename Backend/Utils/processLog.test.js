import { describe, expect, it } from "vitest";
import { processLog, compliesWithTemplate } from "./processLog";
import { ERROR, INFORMATION, WARNING } from "./templateConfig";

const testInput = [
  "I 2032 systemd[1]: Started Refresh fwupd metadata regularly",
  "I faulty systemd[1]: Starting Load AppArmor profiles managed internally by snapd...",
  "W 1145 org.kde.KScreen[2009]:          CRTC: 442",
  "E 49 1876 systemd[1]: Finished Permit User Sessions.",
  "E 58 2147 A something in the sky.",
  "E 2147 23 faulty something in the sky.",
  "E 2147 A faulty something in the sky.",
  "This is a faulty line",
  "E 0 2147 A something in the sky.",
  "W faulty systemd[1]: Starting Load AppArmor profiles managed internally by snapd...",
];

const correctOutput = [
  "W 1145 org.kde.KScreen[2009]:          CRTC: 442",
  "E 49 1876 systemd[1]: Finished Permit User Sessions.",
  "I 2032 systemd[1]: Started Refresh fwupd metadata regularly",
  "E 58 2147 A something in the sky.",
];

it("Should return sorted log lines complying with the template", () => {
  expect(processLog(testInput.join("\n"))).toEqual(correctOutput.join("\n"));
});

describe("Template validation", () => {
  it(`shouldn't accept a line with ${INFORMATION.Tag} without a timestamp at index ${INFORMATION.TimeStampPos}`, () => {
    expect(compliesWithTemplate(testInput[1])).toEqual(false);
  });
  it(`shouldn't accept a line with ${WARNING.Tag} without a timestamp at index ${WARNING.TimeStampPos}`, () => {
    expect(compliesWithTemplate(testInput[9])).toEqual(false);
  });
  it(`shouldn't accept a line with ${ERROR.Tag} without a timestamp at index ${ERROR.TimeStampPos}`, () => {
    expect(compliesWithTemplate(testInput[6])).toEqual(false);
  });
  it(`shouldn't accept a line with ${ERROR.Tag} with severity more than ${ERROR.SeverityHighBound}`, () => {
    expect(compliesWithTemplate(testInput[5])).toEqual(false);
  });
  it(`shouldn't accept a line with ${ERROR.Tag} with severity less than ${ERROR.SeverityLowBound}`, () => {
    expect(compliesWithTemplate(testInput[8])).toEqual(false);
  });
  it(`shouldn't accept a line not starting with a ${INFORMATION.Tag}, ${WARNING.Tag} or ${ERROR.Tag}`, () => {
    expect(compliesWithTemplate(testInput[7])).toEqual(false);
  });
});
