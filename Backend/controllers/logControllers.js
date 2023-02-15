import { validationResult } from "express-validator";

import { processLog } from "../Utils/processLog.js";
import getRelevantLines from "../Utils/getRelevantLines.js";
import HttpError from "../models/HttpError.js";
import LogModel from "../models/Log.js";

export const createLog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(`Invalid ${errors.errors[0].param}.`, 422);
    return next(error);
  }

  const { name, email, log } = req.body;
  console.log(name && email && log);
  if (!(name && email && log)) {
    const error = new HttpError("Request body properties missing.", 400);
    return next(error);
  }

  const createdLog = new LogModel({
    name,
    email,
    log: processLog(log),
  });

  try {
    await createdLog.save();
  } catch (err) {
    let errorMsg = "Creating log failed.";
    let errorStatus = 500;
    if (createdLog.log.length === 0) {
      errorMsg += " The log does not contain any valid lines.";
      errorStatus = 400;
    }
    const error = new HttpError(errorMsg, errorStatus);
    return next(error);
  }

  const relevantLines = getRelevantLines(createdLog.log);

  res.status(201).json({ relevantLines });
};
