import { connect } from 'react-redux'

import AlbumPage from '../AlbumPage/albumPage'

const mapStateToProps = ({ apiToken }) => {
    return {
        apiToken
    }
}

export default connect(mapStateToProps)(AlbumPage)