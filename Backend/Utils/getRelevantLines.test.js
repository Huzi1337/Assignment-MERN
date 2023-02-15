import { describe, expect, it, test } from "vitest";

import getRelevantLines from "./getRelevantLines.js";

const testInput = ["E 50 200 sadasdasd", "E 52 100 asdasd", "I 23 sdaasdas"];

it("should return 2 lines", () => {
  expect(getRelevantLines(testInput.join("\n"))).toEqual(testInput.slice(0, 2));
});
