import Art from "../../models/Art";
import User from "../../models/User";
import { checkToken } from "../../utils/jwtUtil";
import { processUpload } from "../../utils/uploadUtil";

export default {
    Query: {
        getArts: async () => {
          return await Art.find({ publishedAt: { $ne: null } });
        },
        getPublishedArtsByCategory: async (_, { category }) => {
            return await Art.find({ publishedAt: { $ne: null }, category });
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
        },
        addArtToAlbum: async (_, { artId, albumId }, context) => {
            try {
                const userContext = checkToken(context);
                const user = await User.findById(userContext.id);

                const albumAllIndex = user.albums.findIndex(album => album.name === 'All');
                user.albums[albumAllIndex].arts.push(artId);

                const albumIndex = user.albums.findIndex(album => album._id == albumId);
                user.albums[albumIndex].arts.push(artId);
                
                await user.save();
                return user.albums[albumIndex];
            } catch (error) {
                return error;
            }
        },
        deleteArtFromAlbum: async (_, { artId, albumId }, context) => {
            try {
                const userContext = checkToken(context);
                const user = await User.findById(userContext.id);

                const albumIndex = user.albums.findIndex(album => album._id == albumId);
                const artIdIndex = user.albums[albumIndex].arts.findIndex(id => id == artId);
                user.albums[albumIndex].arts.splice(artIdIndex, 1);
                
                await user.save();
                return user.albums[albumIndex];
            } catch (error) {
                return error;
            }
        }
    }
}
