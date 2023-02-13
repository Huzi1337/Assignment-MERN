export const LineTypes = Object.freeze({
  INFORMATION: "I",
  WARNING: "W",
  ERROR: "E",
});

export const LineTypePos = 0;

export const TimeStampPos = Object.freeze({
  WARNING: 1,
  INFORMATION: 1,
  ERROR: 2,
});

export const ERROR = Object.freeze({
  Tag: "E",
  TimeStampPos: 2,
  SeverityPos: 1,
  SeverityLowBound: 1,
  SeverityHighBound: 100,
});

export const WARNING = Object.freeze({
  Tag: "W",
  TimeStampPos: 1,
});

export const INFORMATION = Object.freeze({
  Tag: "I",
  TimeStampPos: 1,
});
