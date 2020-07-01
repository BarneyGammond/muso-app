import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReviewCard from '../ReviewIndex/ReviewCard/reviewCard'

import { API, graphqlOperation } from 'aws-amplify'

import { listReviews as ListReviews} from '../../graphql/queries'

import AlbumPageHeader from './AlbumDetails/albumPageHeader'
import { Col, Row } from 'antd'

export default ({apiToken,albumId}) => {

    let [state,setState] = useState({
        albumName: '',
        albumArtist: '',
        albumImgURL: '',
    })

    let [reviews,setReviews] = useState([])

    async function getReviews() {
        try {
            const reviewData = await API.graphql(graphqlOperation(ListReviews, {
                filter: {
                    albumId: {
                        eq: albumId
                    }
                }
            }))

            console.log('reviewData:', reviewData)
            setReviews(reviewData.data.listReviews.items)
          } catch (err) {
            console.log('error fetching reviews...', err)
          }
    }

    let getAlbum = () => {
        axios.get("https://api.spotify.com/v1/albums/" + albumId, {
            headers: {
                'Authorization': apiToken
            }
        }).then((result) => {
            setState({
                albumName: result.data.name,
                albumArtist: result.data.artists[0].name,
                albumImgURL: result.data.images[0].url
            })
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAlbum()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getReviews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.albumName])

    console.log(state)
    console.log(reviews)

    return (
        <>
            <AlbumPageHeader 
                albumName={state.albumName}
                albumImgURL={state.albumImgURL}
                albumArtist={state.albumArtist}
                albumId={albumId}
            />
            <Row>
            {
                reviews.map((review, index) => (
                <Col sm={{span:24}} md={{span: 12}} lg={{span:8}}>
                    <ReviewCard
                        key={index}
                        reviewTitle={review.title}
                        reviewBody={review.body}
                        reviewAlbumId={albumId}
                        reviewRating={review.rating}
                        reviewAuthor={review.createdBy}
                    />
                </Col>
                ))
            }
            </Row>
        </>
    )
}