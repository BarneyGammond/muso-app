// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './css/main.css'
import 'antd/dist/antd.css'

// component imports
import Header from './components/Header/header'
import ReviewIndex from './components/ReviewIndex/ReviewIndex'
import Search from './components/Search'
import AlbumPage from './components/AlbumPage'
import ReviewForm from './components/ReviewForm'
import { Layout } from 'antd'

// import data resources
import spotifyToken from './apiInstances/spotifyToken'
import qs from 'querystring'
import { Auth } from 'aws-amplify'

const { Footer } = Layout

class App extends React.Component {

  // execute the query in componentDidMount
  async componentDidMount() {
    
    spotifyToken.post("https://accounts.spotify.com/api/token", qs.stringify({
        grant_type: 'client_credentials'
      })).then((result) => {
        console.log(result)
        console.log(this.props)
        this.props.handleApiToken(`Bearer ${result.data.access_token}`)
      }).catch((err) => {
        console.log(err)
    })

    console.log(await Auth.currentUserInfo())
    
  }

  render() {

    return (
      <Router>
        <Layout>
          <Header />

          <Route exact path='/'>
            <ReviewIndex />
          </Route>

          <Route exact path='/album/:albumID' component={({ match }) =>
            <AlbumPage 
              albumId={match.params.albumID}/>
          }/>

          <Route exact path='/album/:albumID/writereview' component={({ match }) =>
            <ReviewForm 
              albumId={match.params.albumID}
            />
          }/>
        
          <Route exact path='/albums'>  
            <Search />
          </Route>

          <Route path='/profile'>
          </Route>
          <Footer>A website by Barney</Footer>
        </Layout>
      </Router>
    )
  }
}

export default (App)