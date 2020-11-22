import { Schema, model } from "mongoose";

export const albumSchema = new Schema({
    name: String,
    arts: [String]
});

export default model("Album", albumSchema);