import React from 'react'

import ReviewIndex from '../ReviewIndex/ReviewIndex'
import { Redirect } from 'react-router-dom'

export default ({username}) => {

    console.log(username)

    return username ? (

        <ReviewIndex 
            filter={{filter: {createdBy: {eq: username }}}}    
        />

    ) : (

        <Redirect to='/profile/sign-in' />

    )
}