import React, { useState } from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core';
import '../styles/createAlbum.scss'

import { CREATE_ALBUM } from '../utils/graphql';
import { useMutation } from '@apollo/react-hooks';
import { client } from '..';

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

const CreateAlbum = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [createAlbum] = useMutation(CREATE_ALBUM, 
        {
            variables: { name: value },
            onCompleted: () => {
                setValue('');
                client.resetStore();
            }
        }
    );

    const onSubmit = event => {
        event.preventDefault();

        if (value.trim()) {
           createAlbum();
        }
    }

    return (
        <div className="album-create">
            <div className="album-create-title">Create new album</div>
            
            <form onSubmit={onSubmit}>
                <TextField
                    className={classes.input}
                    label="Album Name"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
                <Button className={classes.button} type="submit" variant="contained">Save</Button>
            </form>
        </div>
    )
}

export default CreateAlbum
