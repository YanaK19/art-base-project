import React, { useContext, useRef, useState } from 'react'
import ArtComment from './ArtComment'
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { CREATE_ART_COMMENT, FETCH_ART } from '../utils/graphql';

const ArtComments = ({ artId, comments }) => {
    const [text, setText] = useState('');
    const context = useContext(AuthContext);
    const textInputRef = useRef(null);
    const [createArtComment] = useMutation(CREATE_ART_COMMENT, {
        update() {
            setText('');
            textInputRef.current.blur();
        },
        refetchQueries: [{query: FETCH_ART, variables: { artId } }],
        variables: { artId, text }
    });

    return (
        <div>
            <h3>Comments</h3>
            {context.user && (<div>
                <h4>Add Comment</h4>
                <form>
                    <textarea
                    ref={textInputRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    name="text" cols="30" rows="10">
                    </textarea>
                    <button type="button"
                    onClick={createArtComment}
                    disabled={text.trim() === ''}
                    >add</button>
                </form>
            </div>)}

            <div>{comments.map(comment => (
                <div key={comment.id} style={{border: '3px solid grey', margin: 5}}>
                    <ArtComment artId={artId} comment={comment}/>
                </div>
            ))}</div>
        </div>
    )
}

export default ArtComments
