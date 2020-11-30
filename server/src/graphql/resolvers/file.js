import { mkdir } from "fs";
import File from "../../models/File";
import { processUpload } from "../../utils/uploadUtil";

export default {
    Query: {
        files: async () => {
          return await File.find();
        },
    },
    Mutation: {
        uploadFile: async (_, { file }) => {
            // Creates an images folder in the root directory
            mkdir("images", { recursive: true }, (err) => {
              if (err) throw err;
            });
            // Process upload
            const upload = await processUpload(file);
            // save file to the mongodb
            await File.create(upload);
            return upload;
        }
    }
}