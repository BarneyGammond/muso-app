import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './reviewForm.css'

//Components
import { Form, Row, Col, Input, Rate, Button } from 'antd'

//Amplify functions
import { API, graphqlOperation } from 'aws-amplify'

// GraphQL actions
import { createReview as CreateReview} from '../../graphql/mutations'
/* import { updateReview as UpdateReview} from '../../graphql/mutations' */

export default ({apiToken,albumId,edit,reviewTitle,reviewBody}) => {

    // States //

    const [albumData, setAlbumData] = useState({})

    // Api Requests //

    let getAlbum = () => {
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

    async function createReview(title, body, rating, albumId) {
        if (title === '' || body === '') return

        const review = { title, body, albumId, rating }

        try {
            API.graphql(graphqlOperation(CreateReview, { input: review }))
            console.log('item created!')
        } catch (err) {
            console.log('error creating review...', err)
        }
    }

    // Component Mounting //

    useEffect(() => {
        getAlbum()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Event Functions //

    const onFormSubmit = ({title,body,rating}, albumId) => {
        createReview(title,body,rating,albumId)
    }

    return (

        <Row justify='center'>
            <Col span={8}>
                <img 
                    alt='album artwork'
                    style={{width: '100%'}}
                    src={albumData.albumImgURL} 
                />
            </Col>
            <Col span={8}>
                <h2 style={{textAlign: 'center'}}>Write Your Review</h2>
                <Form
                    onFinish={values => onFormSubmit(values, albumId)}
                    size='large'
                    labelCol={{span:6}}
                    WrapperCol={{span:18}}
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
        
    )
}