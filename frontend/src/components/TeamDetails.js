// TeamDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import card from "../assets/card.png";
import player_img from "../assets/player_img.png";
import { Link } from "react-router-dom";

function TeamDetails() {
  const { teamName } = useParams();
  const [players, setPlayers] = useState([]);
  const [groupedPlayers, setGroupedPlayers] = useState({});
  const [coach, setCoach] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/teams/${teamName}/players`)
      .then((response) => {
        const playersData = response.data;

        setPlayers(playersData);

        // Group players by their position
        const grouped = playersData.reduce((acc, player) => {
          if (!acc[player.position]) {
            acc[player.position] = [];
          }
          acc[player.position].push(player);
          return acc;
        }, {});
        setGroupedPlayers(grouped);
      })
      .catch((error) => {
        console.error("Error fetching players!", error);
      });

    axios
      .get(`http://localhost:8081/teams/${teamName}`)
      .then((response) => {
        setCoach(response.data.coach);
      })
      .catch((error) => {
        console.error("Error fetching team details!", error);
      });
  }, [teamName]);

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
      Romania: "RO",
    };
    return countryCodes[teamName] || "";
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return "-";
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

const handleDeletePlayer = (playerId) => {
  axios
    .delete(`http://localhost:8081/players/${playerId}`)
    .then(() => {
      // Re-fetch players after deletion
      axios
        .get(`http://localhost:8081/teams/${teamName}/players`)
        .then((response) => {
          const playersData = response.data;
          setPlayers(playersData);

          // Group players by position
          const grouped = playersData.reduce((acc, player) => {
            if (!acc[player.position]) {
              acc[player.position] = [];
            }
            acc[player.position].push(player);
            return acc;
          }, {});
          setGroupedPlayers(grouped);
        })
        .catch((error) => {
          console.error("Error re-fetching players!", error);
        });
      setPlayerToDelete(null); // Reset the playerToDelete state
    })
    .catch((error) => {
      console.error("Error deleting player:", error);
    });
};


  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="flex flex-col bg-[#eeeee4] overflow-y-hidden">
        {/* Header with team flag and name */}
        <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center justify-between px-10">
          <div className="flex flex-row items-center ml-10 mt-[20%] sm:mt-[15%] md:mt-[22%] xl:mt-[14%] md:ml-[15%] xl:ml-[10%] md:pb-[5.7rem]">
            <img
              src={`https://flagcdn.com/w320/${getCountryCode(
                teamName
              ).toLowerCase()}.png`}
              alt={teamName}
              className="w-30 h-10 md:w-40 md:h-20 mb-2 object-cover "
            />
            <h1 className="text-3xl font-bold text-white ml-5">{teamName}</h1>
            <h2 className="text-xl font-medium text-white ml-4 mt-2">
              ({coach})
            </h2>
          </div>

          <div className="flex space-x-4 mt-[20%] sm:mt-[15%] md:mt-[17%] xl:mt-[10%] md:pb-[5.7rem]">
            {user.admin === 1 && (
              <Link
                to={`/teams/${teamName}/insert-player`}
                className="bg-white text-[#3A034B] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 "
              >
                Insert Player
              </Link>
            )}
            {deleteMode ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 "
                onClick={() => setDeleteMode(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="bg-white text-[#3A034B] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200"
                onClick={() => setDeleteMode((prev) => !prev)}
              >
                Delete Player
              </button>
            )}
          </div>
        </div>

        {/* Players grouped by position */}
        <div className="p-4 mb-[3rem]">
          {Object.entries(groupedPlayers).map(([position, players]) => (
            <div key={position} className="mb-6 mt-[4rem]">
              <h2 className="text-[2rem] font-bold mb-4 ml-[9%] md:ml-[17%] xl:ml-[9%]">
                {position}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:ml-[10%]">
                {players.map((player) => (
                  <div
                    key={player.player_id}
                    className="relative bg-cover bg-no-repeat rounded-lg flex flex-col items-center h-[320px] w-[230px] sm:h-[300px] sm:w-[200px] md:h-[340px] md:w-[230px] xl:h-[420px] xl:w-[300px]"
                    style={{
                      backgroundImage: `url(${card})`, // Background image
                    }}
                  >
                    {/* Team flag */}
                    <img
                      src={`https://flagcdn.com/w80/${getCountryCode(
                        teamName
                      ).toLowerCase()}.png`}
                      alt={teamName}
                      className="absolute top-10 left-[3rem] md:left-[3rem] xl:left-[4rem] w-8 h-6"
                    />
                    {/* Player image */}
                    <img
                      src={player.image_path || player_img}
                      alt={`${player.firstname} ${player.lastname}`}
                      className="absolute top-[39%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-[11rem] w-[11rem] sm:top-[37%] sm:left-[53%] md:top-[37%] md:h-[12.6rem] md:w-[12.6rem] xl:h-60 xl:w-60 xl:top-[39%] xl:left-[50%] object-cover"
                    />
                    <div className="ml-2 mt-[90%] sm:mt-[94%] md:mt-[90%] md:text-lg xl:mt-[88%] xl:text-2xl">
                      {/* Player name */}
                      <p className="font-semibold text-center">
                        {player.firstname} {player.lastname}
                      </p>
                      {/* Player stats */}
                      <div className="sm:text-[0.86rem] md:space-y-0.5 xl:text-[1.1rem]">
                        <p className="text-center">
                          Goals: {player.goals !== null ? player.goals : "-"}
                        </p>
                        <p className="text-center">
                          Assists:{" "}
                          {player.assists !== null ? player.assists : "-"}
                        </p>
                        <p className="text-center">
                          Age:{" "}
                          {player.birth_date
                            ? calculateAge(player.birth_date)
                            : "-"}
                        </p>
                      </div>
                      {deleteMode && (
                        <button
                          onClick={() => setPlayerToDelete(player.player_id)}
                          className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {playerToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              // Close popup only when clicking on the overlay, not on the popup itself
              if (e.target === e.currentTarget) {
                setPlayerToDelete(null);
              }
            }}>
            <div className="bg-white p-4 rounded-lg">
              <h3>Are you sure you want to delete this player?</h3>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleDeletePlayer(playerToDelete)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={() => setPlayerToDelete(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDetails;
