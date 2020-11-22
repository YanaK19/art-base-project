import shortid from "shortid";
import { createWriteStream, mkdir } from "fs";
import File from "../../models/File";

const storeUpload = async ({ stream, filename, mimetype }) => {
    const id = shortid.generate();
    const path = `images/${id}-${filename}`;
    // (createWriteStream) writes our file to the images directory
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path, filename, mimetype }))
        .on("error", reject)
    );
  };
  
  const processUpload = async (upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};

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