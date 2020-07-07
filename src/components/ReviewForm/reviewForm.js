import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './reviewForm.css'
import { useHistory } from 'react-router-dom' 

//Components
import { Form, Row, Col, Input, Rate, Button, Layout } from 'antd'

//Amplify functions
import { API, graphqlOperation } from 'aws-amplify'

// GraphQL actions
import { createReview as CreateReview, updateReview as UpdateReview } from '../../graphql/mutations'
import { getReview as GetReview } from '../../graphql/queries'
/* import { updateReview as UpdateReview} from '../../graphql/mutations' */

const { Content } = Layout

export default ({apiToken,albumId,reviewId}) => {

    const [form] = Form.useForm()
    const history = useHistory()

    // States //

    const [albumData, setAlbumData] = useState({})

    // Api Requests //

    let getAlbum = (albumId) => {
        axios.get("https://api.spotify.com/v1/albums/" + albumId, {
            headers: {
                'Authorization': apiToken
            }
        }).then((result) => {
            setAlbumData({
                albumName: result.data.name,
                albumArtist: result.data.artists[0].name,
                albumImgURL: result.data.images[0].url
            })
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    }

    async function getReview(id) {
        try {
            //Retrieve the review from GraphQL with the review Id
            const {data} = await API.graphql(graphqlOperation(GetReview, {id: reviewId}))
            //Set the form values to the fetched reviews
            form.setFieldsValue({rating: data.getReview.rating, title: data.getReview.title, body: data.getReview.body})
            //Get the album data
            getAlbum(data.getReview.albumId)
            console.log('Review: ',data)
        } catch (err) {
            console.log('error fetching review...', err)
        }
    }

    async function createReview(title, body, rating, albumId) {
        if (title === '' || body === '') return

        const review = { title, body, albumId, rating }

        try {
            API.graphql(graphqlOperation(CreateReview, { input: review }))
            console.log('item created!')
            history.push('/')
        } catch (err) {
            console.log('error creating review...', err)
        }
    }

    async function updateReview(title, body, rating, albumId, reviewId) {
        if (title === '' || body === '') return

        const review = { id: reviewId, title, body, albumId, rating }

        try {
            API.graphql(graphqlOperation(UpdateReview, { input: review }))
            console.log('item updated!')
        } catch (err) {
            console.log('error updating review...', err)
        }
    }

    // Component Mounting //

    useEffect(() => {
        console.log(reviewId)
        reviewId ? getReview() : getAlbum(albumId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Event Functions //

    const onFormSubmit = ({title,body,rating}, albumId) => {
        reviewId ? updateReview(title,body,rating,albumId, reviewId) : createReview(title,body,rating,albumId)
    }

    return (
        <Content>
            <Row style={{padding: '30px 0 0'}}>
                <Col span={24}>
                    <h2 style={{textAlign: 'center'}}>Your Review</h2>
                </Col>
            </Row>
            <Row style={{padding: '20px 0 0'}} justify='center'>
                <Col span={8}>
                    <img 
                        alt='album artwork'
                        style={{width: '100%'}}
                        src={albumData.albumImgURL} 
                    />
                </Col>
                <Col span={8}>
                    <Form
                        form={form}
                        onFinish={values => onFormSubmit(values, albumId)}
                        size='large'
                        labelCol={{span:6}}
                        wrapperCol={{span:18}}
                    >
                        <Form.Item label='Rating' name='rating'>
                            <Rate />
                        </Form.Item>
                        <Form.Item label='Review Title' name='title'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Review Text' name='body'>
                            <Input.TextArea autoSize={{ minRows: 5 }}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 6}}>
                            <Button htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content>
    )
}