import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import './search.css'

import { Input, Layout, Row, Col, Card } from 'antd'

const { Search } = Input
const { Meta } = Card

export default ({apiToken}) => {

    const history = useHistory()

    let [searchState,setSearchState] = useState({
        albumSearch : '',
        albumResults: [],
    })

    let getAlbums = (value) => {
        axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Authorization': apiToken
        },
            params: {
                'q': value,
                'type':'album'
            }
        }).then((result) => {
            console.log(result)
            let searchArray = result.data.albums.items.map(album => {
                return {
                    albumName: album.name,
                    albumArtist: album.artists[0].name,
                    albumURL: album.images[1].url,
                    albumID: album.id
                }
            })
            setSearchState({
                albumSearch: '',
                albumResults: searchArray
            })
            console.log(searchArray)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Layout>
            <Row justify='center'>
                <Col span={20}>
                    <Search
                        className='albumSearchBar'
                        size='large'
                        onSearch={value => getAlbums(value)}
                    />
                </Col>
            </Row>
            <Row>
                {
                    searchState.albumResults.map((result,i) => {
                        return (
                            <Col span={6}>
                                {/* <SearchResult
                                    key={i}
                                    albumName={result.albumName}
                                    artistName={result.albumArtist}
                                    albumImageURL={result.albumURL} 
                                    albumID={result.albumID}
                                /> */}
                                <Card
                                    key={i}
                                    onClick={() => history.push(`/album/${result.albumID}`)}
                                    cover={<img 
                                        alt='album cover'
                                        src={result.albumURL}
                                    />}
                                    hoverable
                                >
                                    <Meta 
                                        title={result.albumName} 
                                        description={result.albumArtist}
                                    />
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Layout>
    )
}