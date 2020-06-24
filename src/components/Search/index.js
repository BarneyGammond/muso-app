import { connect } from 'react-redux'

import search from './search'

const mapStateToProps = ({apiToken}) => {
    return ({
        apiToken
    })
}

export default connect(mapStateToProps)(search)