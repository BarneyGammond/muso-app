import { connect } from 'react-redux'

import ReviewForm from '../ReviewForm/reviewForm'

const mapStateToProps = ({ apiToken }) => {
    return {
        apiToken
    }
}

export default connect(mapStateToProps)(ReviewForm)