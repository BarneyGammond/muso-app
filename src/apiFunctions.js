import axios from 'axios'
import { API, graphqlOperation } from 'aws-amplify'

import { listReviews as ListReviews} from './graphql/queries'

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

export async function getReviewData(setStateFunction) {
    try {
      const reviewData = await API.graphql(graphqlOperation(ListReviews))
      console.log('reviewData:', reviewData)
      setStateFunction(reviewData.data.listReviews.items)
    } catch (err) {
      console.log('error fetching reviews...', err)
    }
}