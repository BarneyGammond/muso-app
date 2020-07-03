import React, { useState, useEffect } from 'react'
import './header.css'
import { useHistory } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { Auth } from 'aws-amplify'

const { Header } = Layout
const { SubMenu } = Menu

export default ({fetchUser,username}) => {

    const history = useHistory()

    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line
    }, [])

    const [menuKey,setMenuKey] = useState([])

    const onProfileClick = (key) => {
        setMenuKey(['profile'])
        history.push('/profile')
    }

    const signOut = async () => {
        try {
            await Auth.signOut();
            fetchUser()
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const onSignOutClick = async () => {
        signOut()
        setMenuKey(['profile'])
    }

    return (
            <Header className='header'>
                <div><h1><Link onClick={() => setMenuKey([])}  to='/'>Muso</Link></h1></div>
                <Menu selectedKeys={menuKey} className="main-nav" mode="horizontal">
                    <Menu.Item 
                        onClick={() => setMenuKey(['album'])} 
                        key="album"
                    >
                        <Link to='/albums'>Album Search</Link>
                    </Menu.Item>
                    <SubMenu
                        onTitleClick={onProfileClick} 
                        title={username ? username : 'Sign In'}
                    >
                        { username ? <Menu.Item onClick={onSignOutClick} key='signOut'>SignOut</Menu.Item> : null }
                    </SubMenu>
                </Menu>
            </Header>
    )
    
}