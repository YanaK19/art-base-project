import Art from "../../models/Art";
import User from "../../models/User";
import { checkToken } from "../../utils/jwtUtil";
import { processUpload } from "../../utils/uploadUtil";

export default {
    Query: {
        getArts: async () => {
          return await Art.find({ publishedAt: { $ne: null } });
        },
    },
    Mutation: {
        createArt: async(_, { createArtInput: {
            title, details, category, tags, file, albumName, toPublish
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
                    createdAt: new Date().toISOString(),
                });
                newArt.img = await processUpload(file);

                if (toPublish) {
                    newArt.publishedAt = new Date().toISOString();
                }

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
        },
        publishArt: async (_, { artId }) => {
            try {
                const art = await Art.findById(artId);
                art.publishedAt = new Date().toISOString();
                return await art.save();
            } catch (error) {
                return error;
            }
        },
        unpublishArt: async (_, { artId }) => {
            try {
                const art = await Art.findById(artId);
                art.publishedAt = null;
                return await art.save();
            } catch (error) {
                return error;
            }
        }
    }
}
