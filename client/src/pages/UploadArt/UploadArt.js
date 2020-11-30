import React, { useCallback, useEffect, useState } from 'react'
import FileUploadWithPreview from '../../components/FileUploadWithPreview';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { client } from '../..';
import {
    FETCH_DICTIONARY,
    FETCH_ALBUMS,
    CREATE_ART
} from '../../utils/graphql';

const UploadArt = props => {
    const { loading: loadingDictionary, data: dataDictionary } = useQuery(FETCH_DICTIONARY);
    const { loading: loadingAlbums, data: dataAlbums } = useQuery(FETCH_ALBUMS);

    const [values, setValues] = useState({
        title: '',
        details: '',
        category: '',
        file: null,
        albumName: '',
        toPublish: false
    });
    const [error, setError] = useState();

    const [createArt, { loading: creating }] = useMutation(CREATE_ART, {
        update(proxy, result) {
            client.resetStore();
        },
        onCompleted() { props.history.push('/'); },
        onError(err) {
            setError(err.graphQLErrors[0].message)
        },
        variables : values
    });

    const savePublishedArt = () => {
        setValues({...values, toPublish: true});
    }

    const saveArt = useCallback(() => {
        createArt();
    }, [createArt]);

    useEffect(() => {
        if (values.toPublish) {
            saveArt();
        }
    }, [values, saveArt])

    return (
        <div>
            <h2>Upload Art</h2>
            {error && (<div>{error}</div>)}
            { !loadingDictionary && !loadingAlbums && (
            <form>
                <FileUploadWithPreview setFile={file => setValues({...values, file})}/>

                <div>title</div>
                <input type="text" name="title"
                    value={values.title}
                    onChange={e => setValues({...values, title: e.target.value})}
                />

                <div>details</div>
                <textarea type="text" name="details"
                    value={values.details}
                    onChange={e => setValues({...values, details: e.target.value})}
                />

                <div>Select category</div>
                <select name="category"
                    value={values.category}
                    onChange={e => setValues({...values, category: e.target.value})}
                >
                    <option value="">-- None --</option>
                    {
                        dataDictionary.getDictionary.categories.map(category => {
                            return (
                            <option key={category.id} value={category.name}>{category.name}</option>
                            )
                        })
                    }
                </select>

                <div>Select album</div>
                <select name="album"
                    value={values.album}
                    onChange={e => setValues({...values, albumName: e.target.value})}                
                >
                    {
                        dataAlbums.getAlbums.map(album => {
                            return (
                            <option key={album.id} value={album.name}>{album.name}</option>
                            )
                        })
                    }
                </select>
                <br/><hr/><br/>
                <div>
                    <button type="button" disabled={creating} onClick={saveArt}>save</button>
                    <br/><br/>
                    <button type="button" disabled={creating} onClick={savePublishedArt}>publish</button>
                </div>

            </form>)}
        </div>
    )
}

export default UploadArt
