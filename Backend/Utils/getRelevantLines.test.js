import { expect, it } from "vitest";
import { ERROR } from "./templateConfig.js";

import getRelevantLines from "./getRelevantLines.js";

const testInput = [
  "E 50 100 sadasdasd",
  "E 52 200 asdasd",
  "I 320 sdaasdas",
  "W 450 asdasdas",
  "E 39 4543 asdasd",
];

it(`should return ${ERROR.Tag} lines with severity of at least 50`, () => {
  expect(getRelevantLines(testInput.join("\n"))).toEqual(testInput.slice(0, 2));
});
