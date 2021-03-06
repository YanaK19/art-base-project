import bcrypt from 'bcrypt'
import Album from '../../models/Album';
import Art from '../../models/Art';
import User from '../../models/User';
import { checkToken, generateToken } from '../../utils/jwtUtil';
import { processUpload } from '../../utils/uploadUtil';

const validateRegisterInput = (email, password, username) => {
    if (email.trim() === '') {
        throw new Error('Email must not be empty');
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            throw new Error('Email must be a valid email address');
        }
    }

    if (password === '') {
        throw new Error('Password must not empty');
    }

    if (username.trim() === '') {
        throw new Error('Username must not be empty');
    }
}

const validateLoginInput = (email, password) => {
    if (email.trim() === '') {
        throw new Error('Email must not be empty');
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            throw new Error('Email must be a valid email address');
        }
    }

    if (password === '') {
        throw new Error('Password must not empty');
    }
}

export default {
    Query: {
        getAlbums: async (parent, _, context) => {
            const userContext = checkToken(context);
            const user = await User.findById(userContext.id);
            return user.albums;
        },
        getAlbumsWithArts: async (parent, _, context) => {
            const userContext = checkToken(context);
            const user = await User.findById(userContext.id);

            const albumsWithArtsPromises = user.albums.map(async (album) => {
                const artsPromises = Promise.all(album.arts.map(artId => Art.findById(artId)));
                return {
                    id: album._id,
                    name: album.name,
                    arts: await artsPromises
                }
            });

           return await Promise.all(albumsWithArtsPromises);
        }
    },
    Mutation: {
        register: async (_, { registerInput: {
            email, password, username, about, file
        } }) => {
            try {
                validateRegisterInput(email, password, username);
                // make sure user doesnt already exist
                const user = await User.findOne({ email });
                if (user) {
                    //throw new Error('User is already exists.');
                }

                const passwordHashed = await bcrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    username,
                    about,
                    password: passwordHashed,
                    albums: [{ name: 'All', arts: [] }],
                    createdAt: new Date().toISOString()
                });

                if (file) {
                    newUser.img = await processUpload(file);
                }

                const res = await newUser.save();
                const token = generateToken(res);

                return { 
                    id: res._id,
                    email: res.email,
                    username: res.username,
                    about: res.about,
                    img: res.img,
                    createdAt: res.createdAt,
                    token
                };
            } catch (error) {
                return error;
            }
        },
        login: async (_, { email, password }) => {
            try {
                validateLoginInput(email, password);
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    throw new Error('Wrong crendetials');
                }

                const token = generateToken(user);
                return { 
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    about: user.about,
                    img: user.img,
                    albums: user.albums,
                    createdAt: user.createdAt,
                    token
                }
            } catch (error) {
                return error;
            }
        },
        createAlbum: async (_, { name }, context) => {
            try {
                const userContext = checkToken(context);

                if (!name) {
                    throw new Error('Album name must not empty');
                }

                const user = await User.findById(userContext.id);
                const newAlbum = new Album({ name })
                user.albums.push(newAlbum);
                await user.save();

                return newAlbum;
            } catch (error) {
                return error;
            }
        },
        deleteAlbum: async (_, { albumId }, context) => {
            try {
                const userContext = checkToken(context);
                const user = await User.findById(userContext.id);

                user.albums = user.albums.filter(album => album._id != albumId);
                
                await user.save();
                return 'Album successfully deleted'
            } catch (error) {
                return error;
            }
        }
    }
}