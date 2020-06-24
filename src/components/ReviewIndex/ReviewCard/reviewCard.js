import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './reviewCard.css';
import { getAlbumData } from '../../../apiFunctions'
import moment from 'moment'

import StarRating from './StarRating/StarRating'


export default ({reviewTitle,reviewBody,reviewAlbumId,reviewCreationDate,apiToken,reviewRating}) => {

    let [state,setState] = useState({})

    useEffect(() => {
        getAlbumData(reviewAlbumId,setState,apiToken)
        // eslint-disable-next-line
    },[apiToken])

    console.log(moment(reviewCreationDate))

    return (

        <div className='reviewCard'>
            <header>
                <h3 className='reviewTitle'>{reviewTitle}</h3>
            </header>
            <div className='artistDetails'>
                <h4>{state.albumArtist}</h4>
                <h4><Link to={`album/${reviewAlbumId}`}>{state.albumName}</Link></h4>
                <StarRating rating={reviewRating}/>
            </div>
            <p>{reviewBody}</p>
            <p className='reviewDate'>
                {moment(reviewCreationDate).format('[created] Do MMMM YYYY')}
            </p>
        </div>
    )
}