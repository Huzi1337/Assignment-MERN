import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import HttpError from "./models/httpError.js";

import logRoutes from "./routes/logRoutes.js";

const databaseURL =
  "mongodb+srv://brainhub:SM8M7jyc9-UPT8M@bigbadcluster.2sp4mjp.mongodb.net/logs?retryWrites=true&w=majority";

const ORIGIN = "http://localhost:5173";

const PORT = 8000;

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");
  next();
});

app.use("/api/logs", logRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Route not found", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(databaseURL)
  .then(() => {
    app.listen(PORT, () => console.log(`Live on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
