import { Schema, model } from "mongoose";

export const albumSchema = new Schema({
    name: String,
    arts: [{ type: Schema.Types.ObjectId, ref: 'arts' }]
});

export default model("Album", albumSchema);