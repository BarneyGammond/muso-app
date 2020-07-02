import React from 'react'

import { Form, Input, Row, Col, Button } from 'antd'

export default () => {

    const onFinish = () => console.log('hello world')

    return (
        <Row justify='center'>
            <Col span={6} style={{paddingTop: '40px'}}>
                <Form
                    name='SignUp'
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='username'
                    >
                        <Input placeholder='username'/>
                    </Form.Item>
                    
                    <Form.Item
                        name='password'>
                        <Input.Password placeholder='password'/>
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type='primary' 
                            htmlType='submit'
                            style={{width: '100%'}}
                        >Log In</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )

}