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
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (dataFoldersWithArts) {
            const defaultAlbum = dataFoldersWithArts.getAlbumsWithArts.find(album => {
                return album.name.toLowerCase() === 'all';
            });
    
            setSelectedAlbum(defaultAlbum);
        }
    }, [loadingFoldersWithArts, dataFoldersWithArts, status])

    return (
        <div>
            { !loadingFoldersWithArts && (
                <div className="portfolio-container">
                    <div className="portfolio-header">
                        <h2>Portfolio: <span style={{color: 'rgb(19, 175, 240)'}}>{selectedAlbum.name}</span></h2>
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
                                <ArtList
                                    onArtDelete={() => setStatus('ok')}
                                    isPortfolio={true}
                                    albums={dataFoldersWithArts.getAlbumsWithArts}
                                    albumId={selectedAlbum.id}
                                    arts={selectedAlbum.arts}
                                /> 
                            </Grid>
                        </Grid>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default Portfolio
