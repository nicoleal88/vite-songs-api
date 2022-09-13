import { useState } from "react"
import "./App.css"
// import axios from "axios"

/*
1- Write a word
2- Select a country/Artist
3- Search the top hits of the country/artist
4- Find the lyrics of every song
5- Find the words in the lyrics
6- List the part of the songs that contains the lyric
*/

// https://open.spotify.com/playlist/37i9dQZF1DXbbu94YBG7Ye

function App() {
  const [word, setWord] = useState("")
  const [songs, setSongs] = useState([])
  const [songsL, setSongsL] = useState([])

  const searchSongs = async (id) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a8cbdb0779msh01d7bc6b433025cp1e280ejsna3119419cc46",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    }

    const request = await fetch(
      `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=3`,
      options
    )
    const data = await request.json()
    return data
  }

  const searchLyrics = async (id) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a8cbdb0779msh01d7bc6b433025cp1e280ejsna3119419cc46",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
      },
    }
    const request = await fetch(
      `https://spotify81.p.rapidapi.com/track_lyrics?id=${id}`,
      options
    )
    const data = await request.json()
    return data
  }

  const handleSearch = async () => {
    const songsList = await searchSongs("37i9dQZF1DXbbu94YBG7Ye")
    console.log("songs: ", songsList.items)
    setSongs(songsList.items)
    console.log("Songs set..")

    const fullSongList = []

    for (const song of songs) {
      const newLyric = await searchLyrics(song.track.id)
      // console.log(newLyric.lyrics.lines)
      const fullSong = {
        id: song.track.id,
        artist: song.track.artists[0],
        songName: song.track.name,
        uri: song.track.uri,
        lyrics: newLyric.lyrics.lines,
      }
      // console.log(fullSong)
      fullSongList.push(fullSong)
      // setSongsL(newLyric.lyrics.lines)
      // console.log(element);
    }
    // console.log(fullSongList)
    setSongsL(fullSongList)

    // const newLyric = await searchLyrics("5ildQOEKmJuWGl2vRkFdYc")
    // console.log(newLyric.lyrics.lines)
    // setSongsL(newLyric.lyrics.lines)

    // const lyric = await searchLyrics()
    // setSongsL(lyric)
  }

  return (
    <div className="App">
      <h1>Wordify</h1>
      <h2> Word to search: </h2>
      <input
        onChange={(e) => {
          setWord(e.target.value)
        }}
        value={word}
        type="text"
      ></input>
      <h2> Playlist: Exitos Argentina </h2>
      <button onClick={handleSearch}> Search songs! </button>
      <ul>
        {!songsL ? (
          <p>Waiting..</p>
        ) : (
          songsL.map((song) => (
            <div key={song.id}>
              <h3>
                {song.artist.name} - {song.songName}
              </h3>
              <small> {song.id} </small>
              {song.lyrics.map((line) =>
                line.words.toLowerCase().includes(word.toLowerCase()) ? (
                  <p> {line.words} </p>
                ) : (
                  <></>
                )
              )}
            </div>
          ))
        )}
      </ul>
      <ul>
        {!songsL ? (
          <p>Waiting Lyric..</p>
        ) : (
          songsL.map((song) => <p> {song.words} </p>)
        )}
      </ul>
    </div>
  )
}

export default App

// const options = {
//   method: "GET",
//   url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
//   params: { id: "37i9dQZF1DXbbu94YBG7Ye", offset: "0", limit: "2" },
//   headers: {
//     "X-RapidAPI-Key": "a8cbdb0779msh01d7bc6b433025cp1e280ejsna3119419cc46",
//     "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
//   },
// }
// axios
//   .request(options)
//   .then((response) => {
//     setSongs(response.data.items)
//     // console.log(response.data.items)
//     // return response.data.items
//   })
//   .catch((error) => {
//     console.error(error)
//   })
