import { connect } from 'react-redux'
import SignIn from './SignIn'

import { fetchUser } from '../../../data/actions'

const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser())
})

export default connect(null, mapDispatchToProps)(SignIn)