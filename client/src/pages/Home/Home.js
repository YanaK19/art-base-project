import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";
import Loading from '../../components/Loading';
import ArtCard from '../../components/ArtCard';

const FETCH_ARTS = gql`
    {
        getArts {
            id
            title details category
            img { id path filename mimetype }
            likes { id }
            publishedAt
        }
    }
`;

const Home = () => {
    const { loading, data } = useQuery(FETCH_ARTS);

    if (!loading) {
        console.log(data);
    }

    return (
        <div>
            { loading && <Loading/> }
            { !loading && (
                <div>
                    {
                        data.getArts.map(art => (
                            <ArtCard key={art.id} art={art}/>
                        ))
                    }
                </div>
            ) }
        </div>
    )
}

export default Home
