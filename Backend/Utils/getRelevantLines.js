import { ERROR } from "./templateConfig.js";

const getRelevantLines = (log) => {
  return log.split("\n").filter((line) => {
    const words = line.split(" ");
    return words[0] === ERROR.Tag && +words[1] >= ERROR.RelevantLineThreshold;
  });
};

export default getRelevantLines;
