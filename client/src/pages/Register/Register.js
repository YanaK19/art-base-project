import React, { useState } from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const REGISTER = gql`
    mutation Register(
        $username: String!
        $about: String
        $email: String!
        $password: String!
        $file: Upload) {
            register(
            registerInput: {
                email: $email
                password: $password
                username: $username
                about: $about
                file: $file
            }
            ) {
                id username email
                token
                img { id path filename mimetype }
            }
    }
`

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        about: '',
        email: '',
        password: ''
    });

    const [register, { loading }] = useMutation(REGISTER, {
        update(proxy, result) {
            console.log(result);
        },
        variables : values
    });

    const onSubmit = e => {
        e.preventDefault();
        console.log(values);
        register();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>username</div>
                <input type="text" name="username"
                    value={values.username}
                    onChange={e => setValues({...values, username: e.target.value})}
                />
                <div>about</div>
                <textarea name="about" id="about"
                    cols="30" rows="10"
                    value={values.about}
                    onChange={e => setValues({...values, about: e.target.value})}                    
                ></textarea>
                <div>email</div>
                <input type="text" name="email"
                    value={values.email}
                    onChange={e => setValues({...values, email: e.target.value})}
                />
                <div>password</div>
                <input type="text" name="password"
                    value={values.password}
                    onChange={e => setValues({...values, password: e.target.value})}
                />
                <button type="submit" disabled={loading}>register</button>
            </form>
        </div>
    )
}

export default Register
