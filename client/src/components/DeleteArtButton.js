import { useMutation } from '@apollo/react-hooks';
import React from 'react'
import {
    FETCH_ARTS,
    FETCH_ALBUMS_WITH_ARTS,
    DELETE_ART_FROM_ALBUM
} from '../utils/graphql';

const DeleteArtButton = ({ artId, albumId }) => {
    const [deleteArtFromAlbum] = useMutation(DELETE_ART_FROM_ALBUM, 
        {
            refetchQueries: [{query: FETCH_ARTS}, {query: FETCH_ALBUMS_WITH_ARTS}],
            variables: { artId, albumId }
        }
    );

    return (
        <button onClick={deleteArtFromAlbum} style={{position: 'absolute', top: 0, left: 0}}>
            Delete
        </button>
    )
}

export default DeleteArtButton
