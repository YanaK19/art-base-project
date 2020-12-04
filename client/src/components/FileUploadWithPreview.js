import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import '../styles/fileUploadWithPreview.scss'

const FileUploadWithPreview = ({ setFile }) => {
    const [uploadedFile, setUploadedFile] = useState({})

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: (acceptedFile) => {
            const file = acceptedFile[0];
            file.preview = URL.createObjectURL(file);
            setUploadedFile(file);
            setFile(file);
        }
    });

    return (
        <div className="file-upload-container">
            <section>
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p style={{textAlign: 'center'}} className="dropzone-tooltip">Upload Your <br/> File Here</p>
            </div>

            <div>Preview</div>
                { uploadedFile && (
                    <div className="img-preview-container">
                        <img className="img-preview" src={uploadedFile.preview} className="img" alt={uploadedFile.length && "img"} />
                    </div>
                ) } 
            </section>
        </div>
    )
}

export default FileUploadWithPreview
