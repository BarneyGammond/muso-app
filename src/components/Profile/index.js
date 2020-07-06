import { connect } from 'react-redux'

import Profile from './Profile'

const mapStateToProps = state => ({
    username: state.user.username
})

export default connect(mapStateToProps)(Profile)