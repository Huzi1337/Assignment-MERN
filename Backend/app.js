import express from "express";
import bodyParser from "body-parser";
import HttpError from "./models/httpError.js";
import logRoutes from "./routes/logRoutes.js";

const CORS_WHITELIST = ["http://localhost:5173", "http://localhost:4173"];

const createApp = () => {
  const app = express();

  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

  app.use((req, res, next) => {
    if (CORS_WHITELIST.indexOf(req.headers.origin) !== -1) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader("Access-Control-Allow-Methods", "POST");
    }

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

  return app;
};

export default createApp;
