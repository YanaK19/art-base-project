import React, { useContext, useState } from 'react'
import moment from 'moment'
import { AuthContext } from '../context/auth';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_ART_COMMENT } from '../utils/graphql';

const ArtComment = ({ artId, comment }) => {
    const context = useContext(AuthContext);
    const [error, setError] = useState();

    const [deleteArtComment, { loading }] = useMutation(DELETE_ART_COMMENT, {
        onError(err) {
            setError(err.graphQLErrors[0].message)
        },
        variables: {artId, commentId: comment.id}
    });

    return (
        <div>
            <p>{comment.user.username}</p>
            <p>{comment.text}</p>
            <p>{moment(comment.createdAt).fromNow(true)}</p>
            { comment.user.img && (<img src={"/" + comment.user.img.path} 
                alt={comment.user.filename}
                style={{width: '10%'}} />)}
            { (context.user && (context.user.id === comment.user.id))
                ?(<button type="button" onClick={deleteArtComment} disabled={loading}>delete comment</button>)
                : ''
            }
            
            {
                error && (<div>{error}</div>)
            }
        </div>
    )
}

export default ArtComment
