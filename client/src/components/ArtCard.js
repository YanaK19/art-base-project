import React from 'react'
import moment from 'moment'

const ArtCard = ({ art }) => {
    return (
    <div key={art.id}>
        <div>{art.title}</div>
        <img src={"/" + art.img.path} 
            alt={art.img.filename}
            style={{width: '30%'}} />
        <div>
            Published (ago): { moment(art.publishedAt).fromNow(true) }
        </div>
    </div>
    )
}

export default ArtCard
