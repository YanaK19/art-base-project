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
            user { 
                id 
                username 
                img { id path filename mimetype } 
            }
            img { id path filename mimetype }
            likes { id }
            publishedAt
        }
    }
`;

const FETCH_DICTIONARY = gql`
    {
        getDictionary(dictionaryId: "5fbaba339e38ef2a144ec4eb") {
            categories {
                id
                name
                details
                imgs { id path filename mimetype }
            }
        }
  }
`;

const Home = () => {
    const { loading: loadingArts, data: dataArts } = useQuery(FETCH_ARTS);
    const { loading: loadingDictionary, data: dataDictionary } = useQuery(FETCH_DICTIONARY);
    
    return (
        <div>
            { (loadingArts || loadingDictionary) && <Loading/> }
            { !loadingArts && !loadingDictionary && (
                <div>
                    <div>
                        <h2>Dictionary</h2>
                        {
                            dataDictionary.getDictionary.categories.map(category => (
                                <div key={category.id}>
                                    <p>{category.name}</p>
                                    <p>{category.details}</p>
                                    {category.imgs.length && (
                                        <p key={category.imgs[0].id}>
                                            <img src={"/" + category.imgs[0].path} 
                                            alt={category.imgs[0].filename}
                                            style={{width: '10%'}} />
                                        </p>
                                    )}
                                </div>
                            ))
                        }
                    </div>

                    <div>
                        <h2>Arts</h2>
                    {
                        dataArts.getArts.map(art => (
                            <ArtCard key={art.id} art={art}/>
                        ))
                    }
                    </div>
                </div>
            ) }
        </div>
    )
}

export default Home
