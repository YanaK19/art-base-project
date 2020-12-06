import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ART_TO_ALBUM, PUBLISH_ART, UNPUBLISH_ART } from '../utils/graphql'
import PublicIcon from '@material-ui/icons/Public';
import { client } from '..';

const MenuArtButton = ({ art, albums }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [albumId, setAlbumId] = React.useState('');
    const [addArtToAlbum] = useMutation(ADD_ART_TO_ALBUM, 
        {
            variables: { artId: art.id, albumId },
            onCompleted: () => {
                setAlbumId('');
                client.resetStore();
            }
        }
    );

    const [unpublishArt] = useMutation(UNPUBLISH_ART, 
        {
            variables: { artId: art.id },
            onCompleted: () => {
                client.resetStore();
            }
        }
    );

    const [publishArt] = useMutation(PUBLISH_ART, 
        {
            variables: { artId: art.id },
            onCompleted: () => {
                client.resetStore();
            }
        }
    );

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setAnchorEl(null);
        setOpen(true);
    };

    const handleAlbumClose = () => {
        setOpen(false);
    };

    const onUnpublishClick = () => {
        unpublishArt();
        handleClose();
    }

    const onPublishClick = () => {
        publishArt();
        handleClose();
    }

    useEffect(() => {
        if (albumId) {
            addArtToAlbum();
        }
    }, [albumId, addArtToAlbum])

    return (
        <>
        <IconButton size="small" aria-controls="menu" aria-haspopup="true"
            onClick={handleClick}
            style={{position: 'absolute', right: 0, color: 'rgb(19, 175, 240)'}}
        >
            <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClickOpen}><PhotoAlbumIcon fontSize="small"/>&nbsp;Add To Album...</MenuItem>

            {art.publishedAt 
                ? (<MenuItem onClick={onUnpublishClick}><UndoIcon fontSize="small"/>&nbsp;Unpublish</MenuItem>)
                : (<MenuItem onClick={onPublishClick}><PublicIcon fontSize="small"/>&nbsp;Publish</MenuItem>)
            }
        </Menu>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="album-dialog-title"
            aria-describedby="album-dialog-description"
        >
            <DialogTitle id="album-dialog-title">Select Album To Add</DialogTitle>
            <DialogContent>
                <DialogContentText id="album-dialog-description">
                    {
                        albums.map(album => (
                            <span key={album.id}>
                                <Button onClick={() => { setAlbumId(album.id); handleAlbumClose(); }} style={{color: '#13aff0'}}>{album.name}</Button>
                                <br/>
                            </span>
                        ))
                    } 
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleAlbumClose} style={{background: 'rgba(0, 0, 0, 0.87)', color: 'white'}}>
                        Close
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default MenuArtButton
