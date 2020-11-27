import React, { useState } from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import FileUploadWithPreview from '../../components/FileUploadWithPreview';

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

// @todo: loading while registering

const Register = props => {
    const [values, setValues] = useState({
        username: '',
        about: '',
        email: '',
        password: '',
        file: null
    });
    const [error, setError] = useState();

    const [register, { loading }] = useMutation(REGISTER, {
        update(_, result) {
            console.log(result);
            props.history.push('/');
        },
        onError(err) {
            setError(err.graphQLErrors[0].message);
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
                <FileUploadWithPreview setFile={file => setValues({...values, file})}/>

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
                {error && (<div style={{color: 'red'}}>
                    {error}
                </div>)}

                <button type="submit" disabled={loading}>register</button>
            </form>
        </div>
    )
}

export default Register
