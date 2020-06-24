import React, {useState,useEffect} from 'react'

import ReviewCard from './ReviewCard'

import { getReviewData, getFilteredReviewData } from '../../data/apiFunctions'

export default ({filter}) => {

    let [reviews,setReviews] = useState([])

    useEffect(() => {
        filter ? getFilteredReviewData(setReviews,filter) : getReviewData(setReviews);
        //eslint-disable-next-line
    },[])

    console.log('reviewIndex:' + reviews)
    
    return (
        <>
        {
            reviews.map((review, index) => (
              <ReviewCard
                key={index}
                reviewTitle={review.title}
                reviewBody={review.body}
                reviewAlbumId={review.albumId}
                reviewCreationDate={review.createdAt}
                reviewRating={review.rating}
                reviewAuthor={review.createdBy}
              />
            ))
        }
        </>
    )
}

