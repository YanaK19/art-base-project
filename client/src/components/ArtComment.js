import React, { useContext, useState } from 'react'
import moment from 'moment'
import { AuthContext } from '../context/auth';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_ART_COMMENT } from '../utils/graphql';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../styles/artComment.scss'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const ArtComment = ({ artId, comment }) => {
    const context = useContext(AuthContext);
    const [, setError] = useState();

    const [deleteArtComment, { loading }] = useMutation(DELETE_ART_COMMENT, {
        onError(err) {
            setError(err.graphQLErrors[0].message)
        },
        variables: {artId, commentId: comment.id}
    });

    return (
        <div style={{'padding-right': '20px'}}>
            <div className="comment-user">
                <div className="img-container">
                {
                    comment.user.img
                    ? (<img className="user" src={"/" + comment.user.img.path} alt={comment.user.img.filename}/>)
                    : (<AccountCircle fontSize="large"/>)
                }
                </div>
                <div class="comment-user-username">
                    {comment.user.username}
                </div>
                {(context.user && (context.user.id === comment.user.id)) && (
                    <div className="delete-comment">
                        <IconButton onClick={deleteArtComment} disabled={loading}>
                            <CloseIcon style={{fontSize: '1.5rem', color: '#13aff0'}}/>
                        </IconButton>
                    </div>
                )}
            </div>
            <div className="comment-text">
                {comment.text}
            </div>
            <div className="comment-created">
                Created { moment(comment.createdAt).fromNow() }
            </div>
        </div>
    )
}

export default ArtComment
