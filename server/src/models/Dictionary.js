import { Schema, model } from "mongoose";
import { fileSchema } from "./File";

const dictionarySchema = new Schema({
    categories: [
        {
            name: String,
            details: String,
            imgs: [fileSchema]    
        }
    ],
    tags: [String]
});

export default model('Dictionary', dictionarySchema);