import React from 'react'
import './header.css'

import {Link} from 'react-router-dom'

export default () => {
    return (
        <header className='siteHeader'>
            <h1><Link to='/'>Muso</Link></h1>
            <nav>
                <ul><Link to='/albums'>Album Search</Link></ul>
            </nav>
        </header>
    )
    
}