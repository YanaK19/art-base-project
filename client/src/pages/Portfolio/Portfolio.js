import { useQuery } from '@apollo/react-hooks';
import React from 'react'
import DeleteArtButton from '../../components/DeleteArtButton';
import { FETCH_ALBUMS_WITH_ARTS } from '../../utils/graphql';

const Portfolio = () => {
    const { loading: loadingFoldersWithArts, data: dataFoldersWithArts } = useQuery(FETCH_ALBUMS_WITH_ARTS);

    return (
        <div>
            { !loadingFoldersWithArts && (
                <div>
                    { dataFoldersWithArts.getAlbumsWithArts.map(album => {
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
                    }) }
                </div>
            ) }
        </div>
    )
}

export default Portfolio
