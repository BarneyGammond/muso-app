import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

export default withAuthenticator(() => {
    return (
        <p>hello there</p>
    )
})