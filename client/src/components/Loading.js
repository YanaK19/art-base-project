import React from 'react'
import loader from '../static/images/loader.gif'

const loaderContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
};

const loaderStyles = {
    width: '11vw',
    height: '11vw'
};

const Loading = () => {
    return (
        <div style={loaderContainerStyles}>
            <img src={loader} style={loaderStyles} alt="loading"/>
        </div>
    )
}

export default Loading