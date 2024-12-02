  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";

  function Teams_images() {
    const [teams, setTeams] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    useEffect(() => {
      axios
        .get("http://localhost:8081/teams")
        .then((response) => {
          setTeams(response.data); // Update the teams with data from the server
        })
        .catch((error) => {
          console.error("There was an error fetching the team data!", error);
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
        Romania: "RO",
      };
      return countryCodes[teamName] || "";
    };

    const handleDelete = (teamName) => {
      axios
        .delete(`http://localhost:8081/teams/${teamName}`)
        .then(() => {
          setTeams((prevTeams) =>
            prevTeams.filter((team) => team.name !== teamName)
          );
          setTeamToDelete(null);
        })
        .catch((error) => {
          console.error("Error deleting team:", error);
        });
    };

    const user = JSON.parse(localStorage.getItem("user"));



    return (
      <div className="flex flex-col">
        {/* Title Section */}
        <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center justify-between px-10">
          <h1 className="text-3xl font-bold text-white mt-[20%] sm:mt-[15%] md:mt-[17%] xl:mt-[10%] md:pb-[5.7rem] md:ml-[10%]">
            Teams
          </h1>
          {user.admin === 1 && (
            <div className="flex space-x-4 mt-[20%] sm:mt-[15%] md:mt-[17%] xl:mt-[10%] md:pb-[5.7rem]">
              <Link
                to={"/insert-team"}
                className="bg-white text-[#3A034B] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 "
              >
                Insert Team
              </Link>
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
                  Delete Team
                </button>
              )}
            </div>
          )}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pt-10 sm:pt-10 md:pt-14 xl:pt-16 md:ml-20 lg:ml-15 pb-20 bg-[#eeeee4]">
          {teams.map((team) =>
            deleteMode ? (
              <div
                key={team.name}
                className="relative flex flex-col items-center p-4"
              >
                <img
                  src={`https://flagcdn.com/w320/${getCountryCode(
                    team.name
                  ).toLowerCase()}.png`}
                  alt={team.name}
                  className="w-40 h-20 mb-2 object-cover"
                />
                <p className="text-center text-black font-semibold">
                  {team.name}
                </p>
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                  onClick={() => setTeamToDelete(team.name)}
                >
                  X
                </button>
              </div>
            ) : (
              <Link
                to={`/teams/${team.name}`}
                key={team.name}
                className="relative flex flex-col items-center p-4"
              >
                <img
                  src={`https://flagcdn.com/w320/${getCountryCode(
                    team.name
                  ).toLowerCase()}.png`}
                  alt={team.name}
                  className="w-40 h-20 mb-2 object-cover"
                />
                <p className="text-center text-black font-semibold">
                  {team.name}
                </p>
              </Link>
            )
          )}
        </div>

        {/* Confirmation Popup */}
        {/* Confirmation Popup */}
        {teamToDelete && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              // Close popup only when clicking on the overlay, not on the popup itself
              if (e.target === e.currentTarget) {
                setTeamToDelete(null);
              }
            }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">
                Are you sure you want to delete {teamToDelete}?
              </h2>
              <div className="flex justify-between">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(teamToDelete)}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                  onClick={() => setTeamToDelete(null)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Teams_images;
