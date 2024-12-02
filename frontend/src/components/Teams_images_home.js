import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const Teams_images_home = () => {
const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  // Fetch teams data
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
    };
    return countryCodes[teamName] || "";
  };

  // Navigate to Teams page
  const handleShowMore = () => {
    navigate("/teams");
  };
  return (
    <div className="bg-[#eeeee4] py-10 pb-20">
      <h2 className="text-3xl font-semibold text-center mb-10">Teams</h2>

      {/* Teams Grid (first 6 teams) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4  md:ml-20 lg:ml-15">
        {teams.slice(0, 6).map((team, index) => (
          <Link
            to={`/teams/${team.name}`}
            key={team.name}
            className="flex flex-col items-center p-4"
          >
            <img
              src={`https://flagcdn.com/w320/${getCountryCode(
                team.name
              ).toLowerCase()}.png`}
              alt={team.name}
              className="w-40 h-20 mb-2 object-contain"
            />
            <p className="text-center text-black font-semibold">{team.name}</p>
          </Link>
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleShowMore}
          className="bg-[#3A034B] text-white py-2 px-4 rounded-lg hover:bg-[#550065]"
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default Teams_images_home;