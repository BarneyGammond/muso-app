import { connect } from 'react-redux'
import Header from './Header'

import { fetchUser, signOut } from '../../data/actions'

const mapStateToProps = state => ({
    username: state.user.username
})

const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser()),
    signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header)