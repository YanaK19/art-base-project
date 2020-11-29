import Art from "../../models/Art";
import User from "../../models/User";
import { checkToken } from "../../utils/jwtUtil";
import { processUpload } from "../../utils/uploadUtil";
import { ObjectId } from 'mongodb'

export default {
    Query: {
        getArts: async () => {
          return await Art.find({ publishedAt: { $ne: null } });
        },
        getPublishedArtsByCategory: async (_, { category }) => {
            return await Art.find({ publishedAt: { $ne: null }, category });
        },
        getPublishedArt: async (_, { artId }) => {
            const art = await Art.findById(artId);
            const user = await User.findById(art.user.id);
            const userArts = user.albums.find(album => album.name === 'All').arts;

            return {
                id: art.id,
                title: art.title,
                details: art.details,
                category: art.category,
                tags: art.tags,
                img: art.img,
                publishedAt: art.publishedAt,
                comments: art.comments,
                likes: art.likes,
                user: {
                    id: user._id,
                    username: user.username,
                    img: user.img,
                    about: user.about,
                    arts: userArts
                }
            };
        }
    },
    Mutation: {
        createArt: async(_, { createArtInput: {
            title, details, category, tags, file, albumName, toPublish
        } }, context) => {
            try {
                if (!title) {
                    throw new Error('Title mustnt be empty');
                }

                const userContext = checkToken(context);
                const user = await User.findById(userContext.id);
                
                // @todo: validateCreateArtInput
                
                const newArt = new Art({
                    title,
                    details,
                    category,
                    tags,
                    user: {
                        id: user._id,
                        username: user.username,
                        img: user.img
                    },
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

                if (user.albums[albumIndex].name === 'All') {
                    await Art.deleteOne({ _id: ObjectId(artId) });

                    let customAlbumIndex;

                    user.albums.forEach((album, i) => {
                        if (album.arts.findIndex(id => id == artId) !== -1) {
                            customAlbumIndex = i;
                        }
                    });

                    if (customAlbumIndex) {
                        const customArtIdIndex = user.albums[customAlbumIndex].arts.findIndex(id => id == artId);
                        user.albums[customAlbumIndex].arts.splice(customArtIdIndex, 1);
                    }
                }
                
                await user.save();
                return user.albums[albumIndex];
            } catch (error) {
                return error;
            }
        },
        likeArt: async (_, { artId }, context) => {
            try {
                const userContext = checkToken(context);
                const art = await Art.findById(artId);
            
                if(!art) {
                    return new Error('Art not found');
                }
            
                if (art.likes.find(like => like.userId == userContext.id)) {
                    // Post already likes, unlike it
                    art.likes = art.likes.filter(like => like.userId != userContext.id);
                } else {
                    // Not liked, like post
                    art.likes.push({
                        userId: userContext.id,
                        createdAt: new Date().toISOString()
                    });
                }
 
                return art.save();
            } catch (err) {
                throw err;
            }
        },
        createArtComment: async (_, { artId, text }, context) => {      
            try {
                const userContext = checkToken(context);

                if (text.trim() === '') {
                    throw new Error('Comment text must not be empty');
                }

                const user = await User.findById(userContext.id);
                const art = await Art.findById(artId);
                if (!art) {
                    throw new Error('Art not found');
                }

                art.comments.unshift({
                    text,
                    createdAt: new Date().toISOString(),
                    user: {
                        id: user._id,
                        username: user.username,
                        img: user.img
                    }
                });

                return await art.save(); 
            } catch(error) {
                return error;
            }
        },
        deleteArtComment: async (_, { artId, commentId }, context) => {
            try {
                const userContext = checkToken(context);

                const art = await Art.findById(artId);
                if (!art) {
                    throw new Error('Art not found');
                }

                const commentIndex = art.comments.findIndex(comment => comment._id == commentId);
    
                if (art.comments[commentIndex].userId == userContext.id) {
                    art.comments.splice(commentIndex, 1);
                    return await art.save();
                } else {
                    return new Error('Wrong user credentials');
                }
                
            } catch (error) {
                return error;
            }
        }
    }
}
