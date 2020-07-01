import React from 'react'
import './albumPageHeader.css'

import { Button, Row, Col } from 'antd'

export default ({ albumName, albumImgURL, albumArtist, albumId }) => {

    return (
        <Row justify='center'>
            <Col span={8} className='albumHeader'>
                <div
                    className='albumHeaderInner'
                >
                    <img alt='album artwork' className='albumImg' src={`${albumImgURL}`}/>
                    <div className='albumDetails'>
                        <h2>{albumName}</h2>
                        <h2>{albumArtist}</h2>
                        <Button size='large' href={`./${albumId}/writereview`} ghost>Write Review</Button>
                    </div>
                </div>
            </Col>
        </Row>
    )
}