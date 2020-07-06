import { connect } from 'react-redux'
import SignIn from './SignIn'

import { fetchUser } from '../../../data/actions'

const mapStateToProps = state => ({
    username: state.user.username
})

const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)