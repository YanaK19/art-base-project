import { useQuery } from '@apollo/react-hooks';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import Album from '../../components/Album';
import './Portfolio.scss';

import { FETCH_ALBUMS_WITH_ARTS } from '../../utils/graphql';
import CreateAlbum from '../../components/CreateAlbum';
import AlbumArtList from '../../components/AlbumArtList';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

const Portfolio = () => {
    const classes = useStyles();
    const { loading: loadingFoldersWithArts, data: dataFoldersWithArts } = useQuery(FETCH_ALBUMS_WITH_ARTS);

    return (
        <div>
            { !loadingFoldersWithArts && (
                <div className="portfolio-container">
                    <div className="portfolio-header">
                        <h2>- Portfolio -</h2>
                    </div>

                    <div className={classes.root}>
                        <Grid container>
                            <Grid item lg={3} md={3} sm={6}>
                                <div className="albums-container">
                                    <CreateAlbum/>
                                    {
                                        dataFoldersWithArts.getAlbumsWithArts.map(album => {
                                            return <Album key={album.id} album={album}/>
                                        })
                                    }
                                </div>
                            </Grid>
                            <Grid item lg={9} md={9} sm={6}>
                                <AlbumArtList arts={[]}/>
                            </Grid>
                        </Grid>
                    </div>

{/*                     { dataFoldersWithArts.getAlbumsWithArts.map(album => {
                        return (
                            <div key={album.id}>
                                <h2>Album Name: {album.name}</h2>
                                {
                                    album.arts.map(art => {
                                        return (
                                        <span key={art.id} style={{position: 'relative'}}>
                                            <img src={"/" + art.img.path} 
                                        alt={art.img.filename}
                                        style={{width: '40%'}} />
                                            <DeleteArtButton
                                                artId={art.id}
                                                albumId={album.id}
                                            />
                                        </span>
                                        )
                                        
                                    })
                                }
                            </div>
                        )
                    }) } */}
                </div>
            ) }
        </div>
    )
}

export default Portfolio
