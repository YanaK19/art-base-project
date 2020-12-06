import React, { useContext, useRef, useState } from 'react'
import ArtComment from './ArtComment'
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { CREATE_ART_COMMENT, FETCH_ART } from '../utils/graphql';
import CommentIcon from '@material-ui/icons/Comment';
import '../styles/artComments.scss';
import { Button, makeStyles, TextField } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles({
    input: {
        '& .MuiFormLabel-root': {
            color: '#ffffff59',
            fontSize: '1.2rem'
        },
        '& .MuiFormLabel-root.Mui-focused': {
           color: '#FF8B09'
        },
        '& .MuiInputBase-root': {
            color: 'white'
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid white'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #FF8B09'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '2px solid #FF8B09'
        }
    },
    button: {
        '&.MuiButton-root': {
            background: '#FF8B09',
            width: '159px',
            fontSize: '1.1rem',
            marginTop: '10px'
        }
    }
});

const ArtComments = ({ artId, comments }) => {
    const classes = useStyles();
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
            <div className="comment-title">
                <CommentIcon fontSize="small" /><span>{comments.length} Comment(s)</span>
            </div>

            <div comments>
                <div>{comments.map(comment => (
                    <ArtComment key={comment.id} artId={artId} comment={comment}/>
                ))}</div>
            </div>

            {context.user &&(<form className="comment-form">
                <TextField
                    ref={textInputRef}
                    multiline={true}
                    rows={3}
                    className={classes.input}
                    label="Share your feedback and comments!"
                    name="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Button startIcon={<ChatBubbleOutlineIcon />}
                    className={classes.button}
                    type="button"
                    variant="contained"
                    onClick={createArtComment}
                    disabled={text.trim() === ''}
                >Post Comment</Button>
            </form>)}
        </div>
    )
}

export default ArtComments
