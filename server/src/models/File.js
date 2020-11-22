import { Schema, model } from "mongoose";

export const fileSchema = new Schema({
  filename: String,
  mimetype: String,
  path: String
});

export default model("File", fileSchema);