import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth';
import { LIKE_ART } from '../utils/graphql';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';

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
        <>
        { liked ? (
                <IconButton onClick={likeArt} color="secondary" aria-label="like art">
                    <FavoriteIcon fontSize="small" />
                </IconButton>
            ) : (
                <IconButton onClick={likeArt} color="secondary" aria-label="unlike art">
                    <FavoriteBorderIcon fontSize="small" />
                </IconButton>
            )
        }
            <span style={{fontSize: '1.5rem'}}>{likeCount} likes</span>
        </>
    ) : '';

    return likeButton;
}

export default LikeButton
