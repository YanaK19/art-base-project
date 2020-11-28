import React, { useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../context/auth';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                id username email
                token
                img { id path filename mimetype }
            }
    }
`

const Login = props => {
    const context = useContext(AuthContext);
    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState();

    const [login, { loading }] = useMutation(LOGIN, {
        update(_, result) {
            console.log(result);
            context.login(result.data.login);
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
        login();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
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

                <button type="submit" disabled={loading}>login</button>
            </form>
        </div>
    )
}

export default Login
