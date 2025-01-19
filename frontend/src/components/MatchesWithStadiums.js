import { useEffect, useState } from "react";
import axios from "axios";

const MatchesWithStadiums = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/matches-with-stadiums")
      .then((response) => setMatches(response.data))
      .catch((error) => console.error("Error fetching matches data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Matches with Stadiums</h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Match ID</th>
            <th className="px-4 py-2 border-b">Team 1</th>
            <th className="px-4 py-2 border-b">Team 2</th>
            <th className="px-4 py-2 border-b">Score</th>
            <th className="px-4 py-2 border-b">Stadium</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.match_id}>
              <td className="px-4 py-2 border-b">{match.match_id}</td>
              <td className="px-4 py-2 border-b">{match.team1_name}</td>
              <td className="px-4 py-2 border-b">{match.team2_name}</td>
              <td className="px-4 py-2 border-b">
                {match.score_team1} - {match.score_team2}
              </td>
              <td className="px-4 py-2 border-b">{match.stadium_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesWithStadiums;
