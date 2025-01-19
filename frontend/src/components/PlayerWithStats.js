import { useEffect, useState } from "react";
import axios from "axios";

const PlayersWithStats = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/players-with-stats")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Players with Team Info & Stats
      </h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">First Name</th>
            <th className="px-4 py-2 border-b">Last Name</th>
            <th className="px-4 py-2 border-b">Position</th>
            <th className="px-4 py-2 border-b">Team</th>
            <th className="px-4 py-2 border-b">Goals</th>
            <th className="px-4 py-2 border-b">Assists</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.firstname + player.lastname}>
              <td className="px-4 py-2 border-b">{player.firstname}</td>
              <td className="px-4 py-2 border-b">{player.lastname}</td>
              <td className="px-4 py-2 border-b">{player.position}</td>
              <td className="px-4 py-2 border-b">{player.team_name}</td>
              <td className="px-4 py-2 border-b">{player.goals}</td>
              <td className="px-4 py-2 border-b">{player.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersWithStats;
