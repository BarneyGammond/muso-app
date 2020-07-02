import React, { useState, useEffect } from 'react'
import './header.css'

import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Header } = Layout

export default ({fetchUser,username}) => {

    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line
    }, [])

    const [menuKey,setMenuKey] = useState([])

    return (
            <Header className='header'>
                <div><h1><Link onClick={() => setMenuKey([])}  to='/'>Muso</Link></h1></div>
                <Menu selectedKeys={menuKey} className="main-nav" theme="dark" mode="horizontal">
                    <Menu.Item 
                        onClick={() => setMenuKey(['album'])} 
                        key="album"
                    >
                        <Link to='/albums'>Album Search</Link>
                    </Menu.Item>
                    <Menu.Item 
                        onClick={() => setMenuKey(['profile'])} 
                        key="profile"
                    >
                        <Link to='/profile'>{username ? username : 'Sign In'}</Link>
                    </Menu.Item>
                </Menu>
            </Header>
    )
    
}