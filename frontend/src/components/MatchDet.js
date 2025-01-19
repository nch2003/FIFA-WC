import { useEffect, useState } from "react";
import axios from "axios";

const MatchDet = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/match-details")
      .then((response) => setMatches(response.data))
      .catch((error) => console.error("Error fetching match details:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Match Details with Teams & Stadiums
      </h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Match Day</th>
            <th className="px-4 py-2 border-b">Team 1</th>
            <th className="px-4 py-2 border-b">Team 2</th>
            <th className="px-4 py-2 border-b">Score</th>
            <th className="px-4 py-2 border-b">Possession</th>
            <th className="px-4 py-2 border-b">Stadium</th>
            <th className="px-4 py-2 border-b">Stadium City</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.match_id}>
              <td className="px-4 py-2 border-b">{match.match_day}</td>
              <td className="px-4 py-2 border-b">{match.team1_name}</td>
              <td className="px-4 py-2 border-b">{match.team2_name}</td>
              <td className="px-4 py-2 border-b">
                {match.score_team1} - {match.score_team2}
              </td>
              <td className="px-4 py-2 border-b">
                {match.possesion_team1}% - {match.possesion_team2}%
              </td>
              <td className="px-4 py-2 border-b">{match.stadium_name}</td>
              <td className="px-4 py-2 border-b">{match.stadium_city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchDet;
