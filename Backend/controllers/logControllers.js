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
      errorMsg +=
        "\nThe log does not contain any valid lines.\nExample valid log lines:\nI 6 Nothing to report\nW 7 Out for lunch\nE 42 21 ERROR: Something has gone horribly wrong\nI 52 Something went wrong while I was out for lunch";
      errorStatus = 400;
    }
    const error = new HttpError(errorMsg, errorStatus);
    return next(error);
  }

  const relevantLines = getRelevantLines(createdLog.log);

  res.status(201).json({ relevantLines });
};
