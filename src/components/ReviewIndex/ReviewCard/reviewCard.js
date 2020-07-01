import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './reviewCard.css';
import { getAlbumData } from '../../../data/apiFunctions'
import moment from 'moment'

import StarRating from './StarRating/StarRating'
import { Card, Row, Col } from 'antd'


export default ({reviewTitle,reviewBody,reviewAlbumId,reviewCreationDate,apiToken,reviewRating,reviewAuthor}) => {

    let [state,setState] = useState({})

    useEffect(() => {
        getAlbumData(reviewAlbumId,setState,apiToken)
        // eslint-disable-next-line
    },[apiToken])

    return (

        <Card className='reviewCard'>
            <header>
                <h3 className='reviewTitle'>{reviewTitle}</h3>
            </header>
            <Row>
                <Col span={6}>
                    <img style={{width: '80%', margin: '0 0 20%'}} alt='album artwork' src={state.albumImgURL} />
                </Col>
                <Col span={18}>
                    <h4>{state.albumArtist}</h4>
                    <h4><Link to={`album/${reviewAlbumId}`}>{state.albumName}</Link></h4>
                </Col>
            </Row>
            <StarRating rating={reviewRating}/>
            <p>{reviewBody}</p>
            <p>{`written by ${reviewAuthor}`}</p>
            <p className='reviewDate'>
                {moment(reviewCreationDate).format('[created] Do MMMM YYYY')}
            </p>
        </Card>
    )
}