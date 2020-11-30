import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import FileUploadWithPreview from '../../components/FileUploadWithPreview';
import { AuthContext } from '../../context/auth';
import { REGISTER } from '../../utils/graphql';

// @todo: loading while registering

const Register = props => {
    const context = useContext(AuthContext);
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
            context.login(result.data.register);
            props.history.push('/');
        },
        onError(err) {
            setError(err.graphQLErrors[0].message);
        },
        variables : values
    });

    const onSubmit = e => {
        e.preventDefault();
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
