import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import User from "../assets/player_img.png"; // Ensure the correct path to your image

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/players")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []);

  const getCountryCode = (teamName) => {
    const countryCodes = {
      Qatar: "QA",
      Ecuador: "EC",
      Senegal: "SN",
      Netherlands: "NL",
      England: "GB",
      Iran: "IR",
      "United States": "US",
      Wales: "GB-WLS",
      Argentina: "AR",
      "Saudi Arabia": "SA",
      Mexico: "MX",
      Poland: "PL",
      France: "FR",
      Australia: "AU",
      Denmark: "DK",
      Tunisia: "TN",
      Spain: "ES",
      "Costa Rica": "CR",
      Germany: "DE",
      Japan: "JP",
      Belgium: "BE",
      Canada: "CA",
      Morocco: "MA",
      Croatia: "HR",
      Brazil: "BR",
      Serbia: "RS",
      Switzerland: "CH",
      Cameroon: "CM",
      Portugal: "PT",
      Ghana: "GH",
      Uruguay: "UY",
      "South Korea": "KR",
    };
    return countryCodes[teamName] || "";
  };

  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="flex flex-col bg-[#eeeee4] overflow-y-hidden">
        <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center">
          <div className="flex flex-row items-center ml-10 mt-[20%] sm:mt-[15%] md:mt-[22%] xl:mt-[14%] md:ml-[15%] xl:ml-[10%] md:pb-[5.7rem]">
            <h1 className="text-3xl font-bold text-white ml-5">Players</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player) => (
          <div
            key={player.firstname + player.lastname}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={User} // Using the imported custom user image
              alt={`${player.firstname} ${player.lastname}`}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">
              {player.firstname} {player.lastname}
            </h2>
            <p className="text-gray-500">{player.position}</p>
            <p className="text-gray-700 mt-2">{player.team_name}</p>
            <img
              src={`https://flagcdn.com/w320/${getCountryCode(
                player.team_name
              ).toLowerCase()}.png`}
              alt={player.team_name}
              className="w-8 h-6"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
