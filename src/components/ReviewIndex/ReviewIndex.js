import React, { useState, useEffect } from 'react'
import './reviewIndex.css'

import ReviewCard from './ReviewCard'
import { Layout, Row, Col } from 'antd'

import { getReviewData, getFilteredReviewData } from '../../data/apiFunctions'

const { Content } = Layout

export default ({ filter }) => {

    let [reviews, setReviews] = useState([])

    useEffect(() => {
        filter ? getFilteredReviewData(setReviews, filter) : getReviewData(setReviews);
        //eslint-disable-next-line
    }, [])

    return (
        <Content className='reviewIndex'>
            <Row gutter={16}>
                {
                    reviews.map((review, i) => (
                        <Col key={i} sm={{span:24}} md={{span: 12}} lg={{span:8}}>
                            <ReviewCard
                                reviewTitle={review.title}
                                reviewBody={review.body}
                                reviewAlbumId={review.albumId}
                                reviewCreationDate={review.createdAt}
                                reviewRating={review.rating}
                                reviewAuthor={review.createdBy}
                            />
                        </Col>
                    ))
                }
            </Row>
        </Content>
    )
}

