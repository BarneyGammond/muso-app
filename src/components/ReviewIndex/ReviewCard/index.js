import { connect } from 'react-redux'

import reviewCard from './reviewCard'

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        apiToken: state.apiToken
    }
}

export default connect(mapStateToProps)(reviewCard);