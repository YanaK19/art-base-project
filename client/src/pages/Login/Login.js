import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../context/auth';
import './Login.scss'
import { LOGIN } from '../../utils/graphql';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        '& .MuiFormLabel-root': {
            color: '#ffffff59'
        },
        '& .MuiFormLabel-root.Mui-focused': {
           color: 'rgb(19, 175, 240)'
        },
        '& .MuiInputBase-root': {
            color: 'white'
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid white'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid rgb(19, 175, 240)'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '2px solid rgb(19, 175, 240)'
        }
    },
    button: {
        '&.MuiButton-root': {
            marginTop: 10,
            background: 'rgb(19, 175, 240)'
        }
    }
});

const Login = props => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState();

    const [login, { loading }] = useMutation(LOGIN, {
        update(_, result) {
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
        login();
    }

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h1 className="login-form-title">Login</h1>
                <TextField
                    className={classes.input}
                    label="Email"
                    value={values.email}
                    onChange={e => setValues({...values, email: e.target.value})}
                />
                <TextField
                    className={classes.input}
                    label="Password"
                    value={values.password}
                    onChange={e => setValues({...values, password: e.target.value})}
                />

                <div className="login-form-error">
                    {error && (<div style={{color: 'red'}}>
                                        {error}
                                    </div>)}
                </div>

                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >Submit</Button>
            </form>
        </div>
    )
}

export default Login
