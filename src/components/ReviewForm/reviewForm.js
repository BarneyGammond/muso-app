import React, { useState } from 'react'
import './reviewForm.css'

//Components
import StarRating from './StarRatingSelect/StarRatingSelect'
//Amplify functions
import { API, graphqlOperation } from 'aws-amplify'

// GraphQL actions
import { createReview as CreateReview} from '../../graphql/mutations'
import { updateReview as UpdateReview} from '../../graphql/mutations'

export default ({albumId,edit,reviewTitle,reviewBody}) => {

    const [reviewData,setReviewData] = useState({
        title: edit ? `${reviewTitle}` : '',
        body: edit ? `${reviewBody}` : '',
        rating: 0
    })

    async function createReview() {
        const { title, body, rating } = reviewData
        if (title === '' || body === '') return

        const review = { title, body, albumId, rating }

        try {
            API.graphql(graphqlOperation(CreateReview, { input: review }))
            console.log('item created!')
        } catch (err) {
            console.log('error creating review...', err)
        }
    }

    async function editReview() {
        const { title, body } = reviewData
        if (title === '' || body === '') return

        const review = { title, body, albumId }

        try {
            API.graphql(graphqlOperation(UpdateReview, { input: review }))
            console.log('item edited!')
        } catch (err) {
            console.log('error creating review...', err)
        }
    }

    let setRating = (num) => {
        console.log(`setting rating to ${num}`)
        setReviewData({
            ...reviewData,
            rating: num
        })
    }

    let onChange = (event) => {
        setReviewData({
            ...reviewData,
            [event.target.name] : event.target.value
        })
    }

    return (
        <div className='reviewFormWrapper'>
            <StarRating 
                rating={ reviewData.rating }
                setRating={ setRating }
            />
            <input
                className='reviewArtistInput'
                name='title'
                onChange={ onChange }
                value={ reviewData.title }
                placeholder='Review Title'
            />
            <textarea
                className='reviewBodyInput'
                name='body'
                onChange={ onChange }
                value={ reviewData.body }
                placeholder='Review Body'>
            </textarea>
            <button 
                className='reviewSubmitButton' 
                onClick={ edit ? editReview : createReview }
                >Submit Review
            </button>
        </div>
    )
}