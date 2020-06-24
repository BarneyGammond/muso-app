import axios from 'axios'
import { API, graphqlOperation } from 'aws-amplify'
import spotifyToken from '../apiInstances/spotifyToken'
import qs from 'querystring'

import { listReviews as ListReviews} from '../graphql/queries'

export const getAlbumData = (albumId, setState, apiToken) => {
    axios.get("https://api.spotify.com/v1/albums/" + albumId, {
        headers: {
            'Authorization': apiToken
        }
    }).then((result) => {
        setState({
            albumName: result.data.name,
            albumArtist: result.data.artists[0].name,
            albumImgURL: result.data.images[0].url,
        })
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
}

export const getApiToken = ({setApiToken}) => {
    spotifyToken.post("https://accounts.spotify.com/api/token", qs.stringify({
        grant_type: 'client_credentials'
      })).then((result) => {
        console.log(result)
        console.log(this.props)
        setApiToken(`Bearer ${result.data.access_token}`)
      }).catch((err) => {
        console.log(err)
    })
}

export const getReviewData = async (setStateFunction) => {
    try {
      const reviewData = await API.graphql(graphqlOperation(ListReviews))
      console.log('reviewData:', reviewData)
      setStateFunction(reviewData.data.listReviews.items)
    } catch (err) {
      console.log('error fetching reviews...', err)
    }
}

export const getFilteredReviewData = async (setStateFunction,variables) => {
    try {
      const reviewData = await API.graphql(graphqlOperation(ListReviews,variables))
      console.log('reviewData:', reviewData)
      setStateFunction(reviewData.data.listReviews.items)
    } catch (err) {
      console.log('error fetching reviews...', err)
    }
}