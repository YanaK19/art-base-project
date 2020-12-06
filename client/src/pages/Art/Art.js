import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment'
import LikeButton from '../../components/LikeButton';
import ArtComments from '../../components/ArtComments';
import { FETCH_ART } from '../../utils/graphql';
import { Grid, makeStyles } from '@material-ui/core';
import './Art.scss';

const useStyles = makeStyles({
    gridItem: {
        '&.MuiGrid-root': {
            position: 'relative',
            minWidth: '47vw',
        },
        '&.MuiGrid-item': {
            display: 'flex',
            flexDirection: 'column',
        },
        '& .MuiFormControl-root': {
            marginBottom: '10px'
        }
    },
    gridInfoItem: {
        maxHeight: '83vh',
        'overflow-y': 'scroll'
    }
});

const Art = () => {
    const classes = useStyles();
    const { id } = useParams();

    const { loading, data } = useQuery(FETCH_ART,
        { variables: { artId : id } });

    return (
        <div className="art-main-container">
            { !loading && (
                <Grid container>
                     <Grid item lg={8} md={8} className={classes.gridItem}>
                        <div className="art-container">
                            <img src={'/' + data.getPublishedArt.img.path}
                                alt={data.getPublishedArt.img.filename}
                                className="art"
                            />
                        </div>
                     </Grid>
                     <Grid className={classes.gridInfoItem} item lg={4} md={4} style={{height: '84vh', alignSelf: 'center'}}>
                        <div className="details-container">
                            <div className="user-container">
                                <div className="user-img">
                                    <img src={'/' + data.getPublishedArt.user.img.path}
                                        alt={data.getPublishedArt.user.img.filename}
                                    />
                                </div>
                                <div className="user-info">
                                    <div className="user-info_username">
                                        {data.getPublishedArt.user.username}
                                    </div>
                                    <div className="user-info_about">
                                        {data.getPublishedArt.user.about}
                                    </div>
                                </div>
                            </div>
                            <div className="art-info-container">
                                <div className="art-title-container">
                                    <div className="art-title">
                                        {data.getPublishedArt.title}
                                    </div>
                                </div>
                                <div className="art-details-container">
                                    {data.getPublishedArt.details}
                                </div>
                                <div className="likes-category-published">
                                    <div className="likes-container">
                                    <LikeButton art={{
                                        id: data.getPublishedArt.id,
                                        likes: data.getPublishedArt.likes,
                                        likeCount: data.getPublishedArt.likes.length
                                    }}/>
                                    </div>

                                    <div className="art-category-published-container">
                                       {data.getPublishedArt.category && (<div className="art-category">
                                            {data.getPublishedArt.category}
                                        </div>)}
                                        <div className="art-published">
                                            Published {moment(data.getPublishedArt.publishedAt).fromNow()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="comments-container">
                                <ArtComments artId={data.getPublishedArt.id} comments={data.getPublishedArt.comments}/>
                            </div>
                        </div>
                     </Grid>
                </Grid>
            )}
        </div>
    )
}

export default Art
