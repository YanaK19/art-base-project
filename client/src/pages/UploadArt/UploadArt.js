import React, { useContext, useState } from 'react'
import FileUploadWithPreview from '../../components/FileUploadWithPreview';
import { AuthContext } from '../../context/auth';
import gql from 'graphql-tag';

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

/* const FETCH_ALBUMS = gql`
    {
  }
`; */

const UploadArt = () => {
    const context = useContext(AuthContext);
    const [values, setValues] = useState({
        title: '',
        details: '',
        category: '',
        file: null,
        albumName: '',
        toPublish: false
    });

    const savePublishedArt = () => {
        setValues({...values, toPublish: true});
        saveArt();
    }

    const saveArt = () => {

    }

    return (
        <div>
            <h2>Upload Art</h2>
            {(<form>
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
                    <option value="">category1</option>
                </select>

                <div>Select album</div>
                <select name="album"
                    value={values.album}
                    onChange={e => setValues({...values, album: e.target.value})}                
                >
                    <option value="">album1</option>
                </select>
                <br/><hr/><br/>
                <div>
                    <button type="button" onClick={saveArt}>save</button>
                    <button type="button" onClick={savePublishedArt}>publish</button>
                </div>

            </form>)}
        </div>
    )
}

export default UploadArt
