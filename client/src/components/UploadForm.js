import { gql, useMutation } from '@apollo/client'
import React from 'react'

const UPLOAD_FILE = gql`
mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      path
      id
      filename
      mimetype
    }
  }
`

const UploadForm = () => {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });

    const handleFileChange = ({ target: { validity, files: [file] } }) => {
        if (validity.valid) uploadFile({ variables: { file }})
    }

    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange}/>
        </div>
    )
}

export default UploadForm
