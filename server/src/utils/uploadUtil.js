import shortid from "shortid";
import { createWriteStream } from "fs";

export const storeUpload = async ({ stream, filename, mimetype }) => {
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
  
export const processUpload = async (upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};