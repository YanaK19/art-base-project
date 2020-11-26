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

        <div>
            Published by: {art.user.username}
            <img src={"/" + art.user.img.path} 
            alt={art.user.img.filename}
            style={{width: '10%'}} />
        </div>
    </div>
    )
}

export default ArtCard
