import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth';

const LIKE_ART = gql`
    mutation likeArt($artId: ID!) {
        likeArt(artId: $artId) {
          id
          likes { id userId }  
        }
    }
`;

const LikeButton = ({ art: {id, likes, likeCount} }) => {
    const [liked, setLiked] =useState(false);
    const { user } = useContext(AuthContext);
    const [ likeArt ] = useMutation(LIKE_ART, {
        variables: { artId: id }
    });

    useEffect(() => {
        if (user && likes.find(like => like.userId === user.id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const likeButton = user ? (
        liked ? (
        <button type="button" onClick={likeArt}>like + {likeCount}</button>
        ) : (
        <button type="button" onClick={likeArt}>like - {likeCount}</button>
        )
    ) : '';

    return likeButton;
}

export default LikeButton
