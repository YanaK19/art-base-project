import React, { useState } from 'react'
import { useQuery } from "@apollo/react-hooks";
import Loading from '../../components/Loading';
import SearchArts from '../../components/SearchArts';
import ArtList from '../../components/ArtList';
import noResults from '../../static/images/no-results.png'
import './Home.scss';

import { FETCH_ARTS, FETCH_DICTIONARY } from '../../utils/graphql';

const Home = () => {
    const [arts, setArts] = useState([]);
    const { loading: loadingArts, data: dataArts } = useQuery(FETCH_ARTS, {
        onCompleted: () => { setArts(dataArts.getArts) }
    });
    const { loading: loadingDictionary, data: dataDictionary } = useQuery(FETCH_DICTIONARY);

    const setFilteredData = filteredData => {
        setArts(filteredData);
    };

    return (
        <div>
            { (loadingArts || loadingDictionary) && <Loading/> }

            {
                !loadingArts && !loadingDictionary && (
                    <>
                    <SearchArts data={dataArts.getArts} setFilteredData={setFilteredData}/>
                
                    <div className="arts-container">
                        {
                            arts.length
                            ? <ArtList arts={arts}/>
                            : <div className="no-results-container">
                                <img className="no-results" src={noResults} alt="no results"/>
                              </div>
                        }
                    </div>
                    </>
                )
            }
{/*             { (loadingArts || loadingDictionary) && <Loading/> }
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
                </div>
            ) } */}
        </div>
    )
}

export default Home
