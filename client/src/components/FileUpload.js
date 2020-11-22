import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const UploadMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      path
      id
      filename
      mimetype
    }
  }
`;

export const FileUpload = () => {
    const [uploadFile] = useMutation(UploadMutation);
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        //console.log(acceptedFiles);
        uploadFile({
            // use the variables option so that you can pass in the file we got above
            variables: { file },
            onCompleted: () => {},
          });
    }, [uploadFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <>
        <div {...getRootProps()} className={`dropzone ${isDragActive && "isActive"}`}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        </>
    );
};
export default FileUpload;