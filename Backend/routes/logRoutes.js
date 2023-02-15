import express from "express";
import { check } from "express-validator";

import { createLog } from "../controllers/logControllers.js";

const router = express.Router();

router.post(
  "/",
  check("name").isString().not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("log").isString(),
  createLog
);

export default router;
