import Art from "../../models/Art";
import User from "../../models/User";
import { checkToken } from "../../utils/jwtUtil";
import { processUpload } from "../../utils/uploadUtil";

export default {
    Query: {
        getArts: async () => {
          return await Art.find();
        },
    },
    Mutation: {
        createArt: async(_, { createArtInput: {
            title, details, category, tags, file, albumName
        } }, context) => {
            try {
                const userContext = checkToken(context);
                const user = await User.findById(userContext.id);
                
                //todo: validateCreateArtInput
                
                const newArt = new Art({
                    title,
                    details,
                    category,
                    tags,
                    userId: userContext.id,
                    createdAt: new Date().toISOString()
                });
                newArt.img = await processUpload(file);

                const albumAllIndex = user.albums.findIndex(album => album.name === 'All');
                user.albums[albumAllIndex].arts.push(newArt._id);

                if (albumName) {
                    const albumIndex = user.albums.findIndex(album => album.name === albumName);
                    user.albums[albumIndex].arts.push(newArt._id);
                }

                await user.save();
                return await newArt.save();
            } catch (error) {
                return error;
            }
        }
    }
}
