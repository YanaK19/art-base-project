import React from 'react'
import '../styles/album.scss';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/react-hooks';
import { client } from '..';
import { makeStyles } from '@material-ui/core';

import { DELETE_ALBUM } from '../utils/graphql';

const useStyles = makeStyles({
    deleteIcon: {
        '&.MuiSvgIcon-root': {
            color: 'rgb(19, 175, 240)'
        }
    }
});

const Album = ({ album, onClick }) => {
    const classes = useStyles();
    const [deleteAlbum] = useMutation(DELETE_ALBUM, 
        {
            variables: { albumId: album.id },
            onCompleted: () => {
                client.resetStore();
            }
        }
    );

    return (
        <>
        <div className="album-container" onClick={onClick}>
            <div className="album-name-container">
                <FolderIcon/>
                <span className="album-name">{ album.name }</span>
            </div>
            <div className="delete-container">
                <DeleteIcon className={classes.deleteIcon} onClick={deleteAlbum}/>
            </div>
        </div>
        </>
    )
}

export default Album
