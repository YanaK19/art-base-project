import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import React from 'react'

const DELETE_ART_FROM_ALBUM = gql`
    mutation deleteArtFromAlbum($artId: ID!, $albumId: ID!) {
        deleteArtFromAlbum(artId: $artId, albumId: $albumId) {
            id name
        }
    }
`;

const FETCH_ARTS = gql`
    {
        getArts {
            id
            title details category
            user { 
                id 
                username 
                img { id path filename mimetype } 
            }
            img { id path filename mimetype }
            likes { id }
            publishedAt
        }
    }
`;

const FETCH_FOLDERS_WITH_ARTS = gql`
    {
        getAlbumsWithArts {
            id
            name
            arts { 
                id title details
                createdAt publishedAt
                likes { id }
                img { id path filename mimetype }
            }
        }
    }
`

const DeleteArtButton = ({ artId, albumId }) => {
    const [deleteArtFromAlbum] = useMutation(DELETE_ART_FROM_ALBUM, 
        {
            refetchQueries: [{query: FETCH_ARTS}, {query: FETCH_FOLDERS_WITH_ARTS}],
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
