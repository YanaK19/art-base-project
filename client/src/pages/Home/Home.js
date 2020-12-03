import React, { useState } from 'react'
import { useQuery } from "@apollo/react-hooks";
import Loading from '../../components/Loading';
import SearchArts from '../../components/SearchArts';
import SearchCategoryArts from '../../components/SearchCategoryArts';
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
                    <div className="search-container">
                        <SearchArts
                            data={dataArts.getArts}
                            setFilteredData={setFilteredData}
                        />
                        <SearchCategoryArts
                            data={dataArts.getArts}
                            categories={dataDictionary.getDictionary.categories}
                            setFilteredData={setFilteredData}
                        />
                    </div>
                    
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
        </div>
    )
}

export default Home
