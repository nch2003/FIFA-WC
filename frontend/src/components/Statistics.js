import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

const Statistics = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch meciuri de la backend
    axios
      .get("http://localhost:8081/stat/matches")
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error("Eroare la obținerea datelor:", error);
      });
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Navbar />
        <div className="bg-[#eeeee4] overflow-x-auto">
          <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center">
            <div className="flex flex-row items-center ml-10 mt-[20%] sm:mt-[15%] md:mt-[22%] xl:mt-[14%] md:ml-[15%] xl:ml-[10%] md:pb-[5.7rem]">
              <h1 className="text-3xl font-bold text-white ml-5">Statistics</h1>
            </div>
          </div>

          <div className="overflow-x-auto p-4 md:ml-[4%]">
            <table className="min-w-full table-auto border-collapse text-center">
              <thead>
                <tr className="bg-[#6A1B9A] text-white">
                  <th className="border p-2">Match ID</th>
                  <th className="border p-2">Data Meciului</th>
                  <th className="border p-2">Echipa 1</th>
                  <th className="border p-2">Echipa 2</th>
                  <th className="border p-2">Scor Echipa 1</th>
                  <th className="border p-2">Scor Echipa 2</th>
                  <th className="border p-2">Offsides</th>
                  <th className="border p-2">Posesie Echipa 1</th>
                  <th className="border p-2">Posesie Echipa 2</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match.match_id} className="hover:bg-gray-200">
                    <td className="border p-2">{match.match_id}</td>
                    <td className="border p-2">{match.match_date}</td>
                    <td className="border p-2">{match.team1}</td>
                    <td className="border p-2">{match.team2}</td>
                    <td className="border p-2">{match.score_team1}</td>
                    <td className="border p-2">{match.score_team2}</td>
                    <td className="border p-2">{match.offsides}</td>
                    <td className="border p-2">{match.possesion_team1}</td>
                    <td className="border p-2">{match.possesion_team2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
