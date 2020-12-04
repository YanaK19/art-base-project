import { useMutation } from '@apollo/react-hooks';
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import {
    FETCH_ARTS,
    FETCH_ALBUMS_WITH_ARTS,
    DELETE_ART_FROM_ALBUM
} from '../utils/graphql';

const DeleteArtButton = ({ artId, albumId, onDelete }) => {
    const [deleteArtFromAlbum] = useMutation(DELETE_ART_FROM_ALBUM, 
        {
            refetchQueries: [{query: FETCH_ARTS}, {query: FETCH_ALBUMS_WITH_ARTS}],
            variables: { artId, albumId },
            onCompleted: () => { onDelete() }
        }
    );

    return (
        <IconButton size="small" aria-label="delete"
            onClick={deleteArtFromAlbum}
            style={{position: 'absolute', top: 0, left: 0, color: 'white'}}
        >
            <DeleteIcon fontSize="small" />
        </IconButton>
    )
}

export default DeleteArtButton
