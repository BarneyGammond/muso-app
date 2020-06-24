import React from 'react'
import './albumPageHeader.css'

import { Link } from 'react-router-dom'

export default ({ albumName, albumImgURL, albumArtist, albumID }) => {

    return (
        <div className='albumHeader'>
            <div
                className='albumHeaderInner'
                style={{backgroundImage: `url(${albumImgURL})`}}
            >
                <div className='albumDetails'>
                    <h2>{albumName}</h2>
                    <h2>{albumArtist}</h2>
                    <Link to={`${albumID}/writereview`}><button><p>Write Review</p></button></Link>
                </div>
            </div>
        </div>
    )
}