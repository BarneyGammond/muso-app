import { connect } from 'react-redux'
import Header from './Header'

import { fetchUser } from '../../data/actions'

const mapStateToProps = state => ({
    username: state.user.username
})

const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header)