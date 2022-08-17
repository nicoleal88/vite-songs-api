import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const searchAPI = (word) => {
    console.log(`Searching ${word} in Spotify API...`);

    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/search/",
      params: {
        q: word,
        type: "artists",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
      headers: {
        "X-RapidAPI-Key": "a8cbdb0779msh01d7bc6b433025cp1e280ejsna3119419cc46",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        const artistsArray = response.data.artists.items;
        // console.log("artistsArray", artistsArray);
        let pretty = [];
        artistsArray.forEach((element) => {
          // console.log(element);
          const artist = {
            artistName: element.data.profile.name,
            uri: element.data.uri,
          };
          console.log(artist);
          pretty.push(artist);
        });
        setResults(results.concat(pretty));
        console.log(pretty);
        console.log(results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    searchAPI(search);
  };

  return (
    <div className="App">
      <h1>Wordify</h1>
      <form onSubmit={handleSearchSubmit}>
        <input onChange={handleSearch} value={search} type="text"></input>
        <button type="submit">Search!</button>
      </form>
      <h2> Lista</h2>
      {results.length === 0 ? (
        <p> Zero</p>
      ) : (
        <ul>
          {results.map((a) => (
            <p key={Math.random()}> {a.artistName} </p>
          ))}
        </ul>
      )}
      <h3>Fin</h3>
    </div>
  );
}

export default App;
