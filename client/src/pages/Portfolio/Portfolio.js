import { useQuery } from '@apollo/react-hooks';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Album from '../../components/Album';
import './Portfolio.scss';
import CreateAlbum from '../../components/CreateAlbum';
import ArtList from '../../components/ArtList';

import { FETCH_ALBUMS_WITH_ARTS } from '../../utils/graphql';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

const Portfolio = () => {
    const classes = useStyles();
    const { loading: loadingFoldersWithArts, data: dataFoldersWithArts } = useQuery(FETCH_ALBUMS_WITH_ARTS);
    const [selectedAlbum, setSelectedAlbum] = useState({});

    useEffect(() => {
        if (dataFoldersWithArts) {
            const defaultAlbum = dataFoldersWithArts.getAlbumsWithArts.find(album => {
                return album.name.toLowerCase() === 'all';
            });
    
            setSelectedAlbum(defaultAlbum);
        }
    }, [loadingFoldersWithArts])

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
                                            return <Album key={album.id} onClick={() => setSelectedAlbum(album)} album={album}/>
                                        })
                                    }
                                </div>
                            </Grid>
                            <Grid item lg={9} md={9} sm={6}>
                                <ArtList isPortfolio={true} albumId={selectedAlbum.id} arts={selectedAlbum.arts} /> 
                            </Grid>
                        </Grid>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default Portfolio
