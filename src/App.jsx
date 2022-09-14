import { useEffect, useLayoutEffect } from "react"
import { useState } from "react"
import "./App.css"
import Card from "./Components/Card.jsx"
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
  useEffect(() => {
    handleSearch()
  }, [])

  const [word, setWord] = useState("")
  const [songs, setSongs] = useState([])
  const [songsL, setSongsL] = useState([])
  const [songsLCounter, setSongsLCounter] = useState(0)

  const searchSongs = async (id) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a8cbdb0779msh01d7bc6b433025cp1e280ejsna3119419cc46",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    }

    const request = await fetch(
      `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=10`,
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
    console.log("Searching...")

    const songsList = await searchSongs("37i9dQZF1DXbbu94YBG7Ye")
    console.log("songs: ", songsList.items)
    setSongs(songsList.items)
    console.log("Songs set..")

    const fullSongList = []
    console.log("before for")
    for (const song of songsList.items) {
      const newLyric = await searchLyrics(song.track.id)
      console.log(newLyric.lyrics.lines)
      const fullSong = {
        id: song.track.id,
        artist: song.track.artists[0],
        songName: song.track.name,
        uri: song.track.uri,
        lyrics: newLyric.lyrics.lines,
        image: song.track.album.images[0].url,
      }
      // console.log(fullSong)
      fullSongList.push(fullSong)
      setSongsLCounter(songsLCounter + 1)
      // setSongsL(newLyric.lyrics.lines)
      // console.log(element);
    }
    console.log("after for")
    // console.log(fullSongList)
    setSongsL(fullSongList)

    // const newLyric = await searchLyrics("5ildQOEKmJuWGl2vRkFdYc")
    // console.log(newLyric.lyrics.lines)
    // setSongsL(newLyric.lyrics.lines)

    // const lyric = await searchLyrics()
    // setSongsL(lyric)
  }

  return (
    <div>
      <h1>Wordify</h1>
      <h2> Playlist: Exitos Argentina </h2>

      {songsLCounter.length < 10 ? (
        <h2> Cargando... {(songsLCounter.length / 10) * 100}% </h2>
      ) : (
        <h3> Introduce una palabra:</h3>
      )}
      <input
        onChange={(e) => {
          setWord(e.target.value)
        }}
        value={word}
        type="text"
      ></input>
      {/* <button onClick={handleSearch}> Search songs! </button> */}
      <ul>
        {!songsL ? (
          <p>Waiting..</p>
        ) : (
          songsL.map((song) => (
            <div key={song.id}>
              {word.length < 3 ? (
                <></>
              ) : (
                song.lyrics.map((line) =>
                  line.words.toLowerCase().includes(word.toLowerCase()) ? (
                    <Card
                      text={line.words}
                      name={song.songName}
                      artist={song.artist.name}
                      image={song.image}
                    />
                  ) : (
                    <></>
                  )
                )
              )}
            </div>
          ))
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
