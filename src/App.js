import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";

function App() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then((response) => response.json())
      .then((data) => setTeams(data));
  }, []);

  useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div className="App">
      <SearchBar setSearch={setSearch} />
      <Table teams={teams.data} games={games.data} search={search} />
    </div>
  );
}

export default App;
