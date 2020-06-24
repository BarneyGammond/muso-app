// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './css/main.css'

// imports from Amplify library

// component imports
import Header from './components/Header/header'
import ReviewIndex from './components/ReviewIndex/ReviewIndex'
import Search from './components/Search'
import AlbumPage from './components/AlbumPage'
import ReviewForm from './components/ReviewForm/reviewForm'

// import data resources
import spotifyToken from './apiInstances/spotifyToken'
import qs from 'querystring'

class App extends React.Component {

  // execute the query in componentDidMount
  async componentDidMount() {
    spotifyToken.post("https://accounts.spotify.com/api/token", qs.stringify({
        grant_type: 'client_credentials'
      })).then((result) => {
        console.log(result)
        this.props.handleApiToken(`Bearer ${result.data.access_token}`)
      }).catch((err) => {
        console.log(err)
    })
  }

  render() {

    return (
      <Router>
        <Header />
        <Route exact path='/'>
          <ReviewIndex />
        </Route>

        <Route exact path='/album/:albumID' component={({ match }) =>
          <AlbumPage 
            albumID={match.params.albumID}/>
        }/>

        <Route exact path='/album/:albumID/writereview' component={({ match }) =>
          <ReviewForm 
            albumId={match.params.albumID}
          />
        }/>

        <Route exact path='/albums'>  
          <Search />
        </Route>
      </Router>
    )
  }
}

export default App