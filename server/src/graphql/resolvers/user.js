import bcrypt from 'bcrypt'
import User from '../../models/User';
import { generateToken } from '../../utils/jwtUtil';

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

export default {
    Mutation: {
        register: async (_, { registerInput: {
            email, password, username, about
        } }) => {
            try {
                validateRegisterInput(email, password, username);
                // make sure user doesnt already exist
                const user = await User.findOne({ email });
                if (user) {
                    throw new Error('User is already exists.');
                }

                const passwordHashed = await bcrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    username,
                    about,
                    password: passwordHashed,
                    createdAt: new Date().toISOString()
                });

                const res = await newUser.save();
                const token = generateToken(res);

                return { 
                    id: res._id,
                    email: res.email,
                    username: res.username,
                    about: res.about,
                    createdAt: res.createdAt,
                    token
                };
            } catch (error) {
                return error;
            }
        }
    }
}