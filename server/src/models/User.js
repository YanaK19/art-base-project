import { Schema, model } from "mongoose";
import { albumSchema } from "./Album";
import { fileSchema } from "./File";

const userSchema = new Schema({
  email: String,
  password: String,
  username: String,
  about: String,
  img: fileSchema,
  albums: [albumSchema],
  createdAt: String
});

export default model('User', userSchema);