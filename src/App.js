// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './css/main.css'
import 'antd/dist/antd.css'

// component imports
import Header from './components/Header'
import ReviewIndex from './components/ReviewIndex/ReviewIndex'
import Search from './components/Search'
import AlbumPage from './components/AlbumPage'
import ReviewForm from './components/ReviewForm'
import { Layout } from 'antd'
import SignIn from './components/Profile/SignIn'
import Profile from './components/Profile'

// import data resources
import spotifyToken from './apiInstances/spotifyToken'
import qs from 'querystring'

const { Footer } = Layout

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
                <Layout>
                    <Header />

                    <Route exact path='/'>
                        <ReviewIndex />
                    </Route>

                    <Route exact path='/album/:albumId' component={({ match }) =>
                        <AlbumPage
                            albumId={match.params.albumId} />
                    } />

                    <Route exact path='/album/:albumId/writereview' component={({ match }) =>
                        <ReviewForm
                            albumId={match.params.albumId}
                        />
                    } />

                    <Route path='/review/:reviewId/edit' component={({ match }) => 
                        <ReviewForm
                            reviewId={match.params.reviewId}
                        />
                    } />

                    <Route exact path='/albums'>
                        <Search />
                    </Route>

                    <Route exact path='/profile'>
                        <Profile />
                    </Route>

                    <Route exact path='/profile/sign-in'>
                        <SignIn />
                    </Route>

                    <Footer>A website by Barney</Footer>
                </Layout>
            </Router>
        )
    }
}

export default (App)