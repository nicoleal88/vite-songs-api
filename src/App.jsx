import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const searchAPI = (word) => {
    console.log(`Searching ${word} in Spotify API...`);
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
    </div>
  );
}

export default App;
