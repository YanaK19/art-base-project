import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';

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
        <div>
            <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some file here, or click to select file</p>
            </div>

            <h2>Preview</h2>
                { uploadedFile && (
                    <div style={{background: 'black'}}>
                    <aside className="thumb-container">
                        <div className="thumb" key={uploadedFile.name}>
                            <div className="thumb-inner">
                                <img src={uploadedFile.preview} className="img" alt={uploadedFile.length && "img"} />
                            </div>
                        </div>
                    </aside>
                    </div>
                ) } 
            </section>
        </div>
    )
}

export default FileUploadWithPreview
