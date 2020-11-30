import gql from 'graphql-tag';

export const FETCH_DICTIONARY = gql`
    {
        getDictionary(dictionaryId: "5fbaba339e38ef2a144ec4eb") {
            categories {
                id
                name
                details
                imgs { id path filename mimetype }
            }
        }
  }
`;

export const FETCH_ALBUMS = gql`{ getAlbums{ id name } }`;

export const FETCH_ARTS = gql`
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

export const FETCH_ALBUMS_WITH_ARTS = gql`
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
`;

export const FETCH_ART = gql`
    query GetPublishedArt($artId: ID!) {
        getPublishedArt(artId: $artId) {
            id
            title
            details
            category
            tags
            publishedAt
            img { id path filename mimetype }
            user {
                id
                username
                about
                img { id path filename mimetype }
            }
            comments {
                id
                text
                createdAt
                user {
                    id
                    username
                    img { id path filename mimetype }
                }
            }
            likes { id userId }
        }
    }
`;

export const REGISTER = gql`
    mutation Register(
        $username: String!
        $about: String
        $email: String!
        $password: String!
        $file: Upload) {
            register(
            registerInput: {
                email: $email
                password: $password
                username: $username
                about: $about
                file: $file
            }
            ) {
                id username email
                token
                img { id path filename mimetype }
            }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                id username email
                token
                img { id path filename mimetype }
            }
    }
`;

export const CREATE_ART = gql`
    mutation CreateArt(
        $title: String!
        $details: String
        $category: String
        $albumName: String
        $toPublish: Boolean
        $file: Upload!) {
        createArt(createArtInput: {
            title: $title
            details: $details
            category: $category
            albumName: $albumName
            toPublish: $toPublish
            file: $file
        }) {
            id
            title details category publishedAt
            img { id path filename mimetype }
            user { id username img { id path filename mimetype } }
        }
    }
`;

export const LIKE_ART = gql`
    mutation likeArt($artId: ID!) {
        likeArt(artId: $artId) {
          id
          likes { id userId }  
        }
    }
`;

export const CREATE_ART_COMMENT = gql`
    mutation createArtComment($artId: ID!, $text: String!) {
        createArtComment(artId: $artId, text: $text) {
            id
            comments { id text }
        }
    }
`;

export const DELETE_ART_COMMENT = gql`
    mutation deleteArtComment($artId: ID!, $commentId: ID!) {
        deleteArtComment(artId: $artId, commentId: $commentId) {
            id
            comments {
                id text
            }
        }
    }
`;

export const DELETE_ART_FROM_ALBUM = gql`
    mutation deleteArtFromAlbum($artId: ID!, $albumId: ID!) {
        deleteArtFromAlbum(artId: $artId, albumId: $albumId) {
            id name
        }
    }
`;