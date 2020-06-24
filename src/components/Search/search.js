import React, {useState} from 'react'
import axios from 'axios'

import './search.css'

import SearchResult from './SearchResult/searchResult'

export default ({apiToken}) => {

    let [searchState,setSearchState] = useState({
        albumSearch : '',
        albumResults: [],
    })

    let onChange = (event) => {
        setSearchState({
            ...searchState,
            [event.target.name] : event.target.value
        })
    }

    let getAlbums = () => {
        axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Authorization': apiToken
        },
            params: {
                'q': searchState.albumSearch,
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
        <>
            <div className='albumSearchWrapper'>
                <input 
                    className='albumSearchInput'
                    value={searchState.albumSearch} 
                    name='albumSearch' 
                    onChange={onChange} 
                    placeholder='Album Search'>
                </input>
                <button
                    className='albumSearchButton'
                    onClick={getAlbums}
                    >Search
                </button>
            </div>
            <div className='resultsWrapper'>
                {
                    searchState.albumResults.map((result,i) => {
                        return (
                            <SearchResult
                                key={i}
                                albumName={result.albumName}
                                artistName={result.albumArtist}
                                albumImageURL={result.albumURL} 
                                albumID={result.albumID}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}