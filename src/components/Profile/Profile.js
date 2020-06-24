import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

import ReviewIndex from '../ReviewIndex/ReviewIndex'

export default withAuthenticator(() => {
    return (
        <ReviewIndex
            filter={{filter: {createdBy: {eq: "BarneyGammond"}}}} />
    )
})