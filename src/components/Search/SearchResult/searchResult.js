import React from 'react'
import {Link} from 'react-router-dom'

import './searchResult.css'

export default ({albumName,artistName,albumImageURL,albumID}) => {

    console.log(albumImageURL)

    return (
        <div className='searchResult'>
            <img className='albumCover' src={albumImageURL} alt='album artwork'></img>
            <div className='searchResultDetails'>
                <h3>{albumName}</h3>
                <h3>{artistName}</h3>
                <Link to={`album/${albumID}`}>
                    <button>Album Reviews</button>
                </Link>
                <Link to={`album/${albumID}/writereview`}>
                    <button>Review Album</button>
                </Link>
            </div>
        </div>
    )

}