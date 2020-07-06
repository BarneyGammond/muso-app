import React from 'react'
import { Auth } from 'aws-amplify'
import { useHistory, Redirect } from 'react-router-dom'

import { Form, Input, Row, Col, Button } from 'antd'

export default ({username, fetchUser}) => {

    const history = useHistory()

    async function SignIn(username,password) {
        try {
            await Auth.signIn(username, password);
            fetchUser()
            history.push('/profile')
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    const onFinish = ({username, password}) => {
        SignIn(username,password)
    }

    return !username ? (
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
    ) : (

        <Redirect to='/profile' />

    )

}