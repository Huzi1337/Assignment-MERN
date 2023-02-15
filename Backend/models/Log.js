import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  log: { type: String, required: true },
});

const LogModel = mongoose.model("Log", Schema);
export default LogModel;
