import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment'

const FETCH_ART = gql`
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
            likes { id }
        }
    }
`;

const Art = () => {
    const { id } = useParams();
    const history = useHistory();
    

    const { loading, data } = useQuery(FETCH_ART,
        { variables: { artId : id } });

    if (!loading) {
        console.log(data, id);
    }

    const likeArt = () => {
        console.log('like');
    }

    const commentArt = () => {
        console.log('comment');
    }

    return (
        <div>
            <h2>Art Details</h2>
            { !loading && (
                <div>
                    <button type="button" onClick={() => history.goBack()}>
                        Go back
                    </button>
                    
                    <button onClick={likeArt}>Like <span>{data.getPublishedArt.likes.length}</span></button>
                    
                    <button onClick={commentArt}>Comment</button>
                    
                    <p>{data.getPublishedArt.title}</p>
                    <p>{data.getPublishedArt.details}</p>
                    <p>{data.getPublishedArt.category}</p>
                    <p>{moment(data.getPublishedArt.publishedAt).fromNow(true)}</p>
                    <img src={"/" + data.getPublishedArt.img.path} 
                        alt={data.getPublishedArt.img.filename}
                        style={{width: '30%'}} />
                    <p>{data.getPublishedArt.user.username}</p>
                    <p>{data.getPublishedArt.user.about}</p>
                    <h3>Comments</h3>
                    <div>{data.getPublishedArt.comments.map(comment => (
                        <div key={comment.id}>
                            <p>{comment.user.username}</p>
                            <p>{comment.text}</p>
                            <p>{moment(comment.createdAt).fromNow(true)}</p>
                            <img src={"/" + comment.user.img.path} 
                                alt={comment.user.filename}
                                style={{width: '10%'}} />
                        </div>
                    ))}</div>
                </div>
            ) }
        </div>
    )
}

export default Art
