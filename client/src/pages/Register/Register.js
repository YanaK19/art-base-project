import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import FileUploadWithPreview from '../../components/FileUploadWithPreview';
import { AuthContext } from '../../context/auth';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import './Register.scss'

import { REGISTER } from '../../utils/graphql';

// @todo: loading while registering

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
            marginTop: 60,
            background: 'rgb(19, 175, 240)'
        }
    },
    gridItem: {
        '&.MuiGrid-item': {
            display: 'flex',
            flexDirection: 'column',
        },
        '& .MuiFormControl-root': {
            marginBottom: '10px'
        }
    }
});

const Register = props => {
    const classes = useStyles();
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
        <div className="register-form-container">
            <form className="register-form" onSubmit={onSubmit}>
                <Grid container>
                    <Grid item className={classes.gridItem}>
                        <TextField
                            className={classes.input}
                            label="Username"
                            value={values.username}
                            onChange={e => setValues({...values, username: e.target.value})}
                        />
                        <TextField
                            multiline={true}
                            rows={5}
                            className={classes.input}
                            label="About"
                            value={values.about}
                            onChange={e => setValues({...values, about: e.target.value})}
                        />
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

                        <div className="register-error">
                            {error && (<div style={{color: 'red'}}>
                                {error}
                            </div>)}
                        </div>

                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >Register</Button>
                    </Grid>
                    <Grid item>
                        <FileUploadWithPreview setFile={file => setValues({...values, file})}/>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Register
