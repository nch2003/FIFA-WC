import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

function MatchDetails() {
  const { matchId } = useParams(); // Retrieve matchId from URL
  const [matchDetails, setMatchDetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/matches/${matchId}`) // Endpoint to fetch match details
      .then((response) => {
        setMatchDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching match details!", error);
      });
  }, [matchId]);

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
      <div className="flex flex-col bg-[#eeeee4] overflow-y-hidden min-h-screen">
        {/* Header */}
        <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center">
          <div className="flex flex-row items-center ml-10 mt-[20%] sm:mt-[15%] md:mt-[22%] xl:mt-[14%] md:ml-[15%] xl:ml-[10%] md:pb-[5.7rem]">
            <h1 className="text-3xl font-bold text-white ml-5">
              Match Details
            </h1>
          </div>
        </div>

        {/* Match Details */}
        <div className="flex justify-center">
          <div className="bg-white shadow-md p-10 flex flex-col gap-10 w-full md:h-auto">
            {/* Group Stage and Date */}
            <div className="flex justify-between items-center text-gray-500 md:ml-[7%]">
              <div className="text-sm font-medium">{matchDetails.stage}</div>
              <div className="text-sm">{matchDetails.match_day}</div>
            </div>

            {/* Teams and Scores */}
            <div className="flex items-center justify-around">
              {/* Left Team */}
              <Link
                to={`/teams/${matchDetails.team1_name}`}
                key={matchDetails.team1_name}
                className="flex items-center justify-end gap-2 w-1/4"
              >
                <span className="text-lg font-semibold">
                  {matchDetails.team1_name}
                </span>
                <img
                  src={`https://flagcdn.com/w320/${getCountryCode(
                    matchDetails.team1_name
                  ).toLowerCase()}.png`}
                  alt={matchDetails.team1_name}
                  className="w-16 h-12"
                />
              </Link>

              {/* Score */}
              <div className="text-2xl font-bold mx-10">
                {matchDetails.score_team1} - {matchDetails.score_team2}
              </div>

              {/* Right Team */}
              <Link
                to={`/teams/${matchDetails.team2_name}`}
                key={matchDetails.team2_name}
                className="flex items-center justify-begin gap-2 w-1/4"
              >
                <img
                  src={`https://flagcdn.com/w320/${getCountryCode(
                    matchDetails.team2_name
                  ).toLowerCase()}.png`}
                  alt={matchDetails.team2_name}
                  className="w-16 h-12"
                />
                <span className="text-lg font-semibold">
                  {matchDetails.team2_name}
                </span>
              </Link>
            </div>

            {/* Stats Section */}
          </div>
        </div>
        <div className="flex flex-col align-center justify-center mt-10 bg-white ml-[15%] rounded-lg mr-[15%] mb-[25%] md:mb-[15%]">
          {/* Possession */}
          <h3 className="text-center font-bold mt-5">Possession</h3>
          <div className="flex items-center justify-between">
            <span className="p-5">{matchDetails.possesion_team1}%</span>
            <div className="w-4/5 bg-gray-200 rounded-full h-2 relative">
              <div
                className="absolute bg-purple-700 h-2 rounded-full"
                style={{
                  width: `${matchDetails.possesion_team1}%`,
                }}
              ></div>
              <div
                className="absolute bg-orange-500 h-2 rounded-full"
                style={{
                  left: `${matchDetails.possesion_team1}%`,
                  width: `${100 - matchDetails.possesion_team1}%`,
                }}
              ></div>
            </div>
            <span className="p-5">{matchDetails.possesion_team2}%</span>
          </div>

          {/* Goals */}
          <div className="mt-10">
            <h3 className="text-center font-bold">Goals</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="p-5">{matchDetails.score_team1}</span>
              <div className="w-4/5 bg-gray-200 rounded-full h-2 relative mx-2">
                <div
                  className="absolute bg-purple-700 h-2 rounded-full"
                  style={{
                    width: `${
                      (matchDetails.score_team1 /
                        (matchDetails.score_team1 + matchDetails.score_team2)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="p-5">{matchDetails.score_team2}</span>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="mt-6">
            {/* You can add more stats like offsides or other */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchDetails;
