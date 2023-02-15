import { ERROR, WARNING, INFORMATION, LineTypePos } from "./templateConfig.js";
import HttpError from "../models/httpError.js";

export const processLog = (log) => {
  const unsortedLog = log
    .split("\n")
    .filter((line) => compliesWithTemplate(line));
  let temp = unsortedLog
    .sort((lineA, lineB) => getTimeStamp(lineA) - getTimeStamp(lineB))
    .join("\n");
  console.log(temp);
  return temp;
};

export const compliesWithTemplate = (line) => {
  const words = line.split(" ");
  switch (words[LineTypePos]) {
    case INFORMATION.Tag:
      return !isNaN(words[INFORMATION.TimeStampPos]);
    case WARNING.Tag:
      return !isNaN(words[WARNING.TimeStampPos]);
    case ERROR.Tag:
      return (
        !isNaN(words[ERROR.TimeStampPos]) &&
        !isNaN(words[ERROR.SeverityPos]) &&
        checkBoundaries(
          +words[ERROR.SeverityPos],
          ERROR.SeverityLowBound,
          ERROR.SeverityHighBound
        )
      );
    default:
      return false;
  }
};
//should check for integer

const getTimeStamp = (line) => {
  const words = line.split(" ");
  switch (words[LineTypePos]) {
    case INFORMATION.Tag:
      return +words[INFORMATION.TimeStampPos];
    case WARNING.Tag:
      return +words[WARNING.TimeStampPos];
    case ERROR.Tag:
      return +words[ERROR.TimeStampPos];
    default:
      throw new HttpError(
        "Can't check for timestamp on an untagged line.",
        500
      );
  }
};

const checkBoundaries = (number, lowBound, highBound) => {
  return number >= lowBound && number <= highBound;
};
