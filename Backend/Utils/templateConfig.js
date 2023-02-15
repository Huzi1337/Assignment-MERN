export const LineTypePos = 0;

export const ERROR = Object.freeze({
  Tag: "E",
  TimeStampPos: 2,
  SeverityPos: 1,
  SeverityLowBound: 1,
  SeverityHighBound: 100,
  RelevantLineThreshold: 50,
});

export const WARNING = Object.freeze({
  Tag: "W",
  TimeStampPos: 1,
});

export const INFORMATION = Object.freeze({
  Tag: "I",
  TimeStampPos: 1,
});
