import { connect } from 'react-redux'
import Header from './Header'

import { fetchUser } from '../../data/actions'

const mapDispatchToProps = dispatch => {
    return ({
        fetchUser: () => dispatch(fetchUser())
    })
}

export default connect(null,mapDispatchToProps)(Header)