import React, {useState,useEffect} from 'react'

import ReviewCard from './ReviewCard'

import { getReviewData } from '../../data/apiFunctions'

export default () => {

    let [reviews,setReviews] = useState([])

    useEffect(() => {
        getReviewData(setReviews)
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

