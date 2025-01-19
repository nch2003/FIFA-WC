import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

function Matches() {
  const [groupedMatches, setGroupedMatches] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/matches")
      .then((response) => {
        const matches = response.data; 
        setGroupedMatches(matches);
      })
      .catch((error) => {
        console.error("Error fetching matches!", error);
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
            <h1 className="text-3xl font-bold text-white ml-5">Matches</h1>
          </div>
        </div>

        <div className="p-4 mt-10 mb-[15%] md:mb-10 md:ml-[7%]">
          {Object.entries(groupedMatches).map(([date, matches]) => (
            <div key={date} className="mb-6">
              <h2 className="text-2xl font-bold mb-4 ml-4 md:ml-10">
                {date}
              </h2>

              <div className="flex flex-1 flex-col gap-4 ">
                {matches.map((match, index) => (
                  <Link
                    to={`/matchdetails/${match.match_id}`}
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:border-black hover:border-[1px]"
                  >
                    <div className="text-sm text-gray-500 flex-shrink-0 w-1/4 text-left">
                      {match.stage}
                    </div>

                    <div className="flex items-center justify-center w-full md:mr-[7%]">
                      <div className="flex items-center justify-end gap-1 w-1/4">
                        <span className="text-sm md:text-lg  font-semibold">
                          {match.team1_name}
                        </span>
                        <img
                          src={`https://flagcdn.com/w320/${getCountryCode(
                            match.team1_name
                          ).toLowerCase()}.png`}
                          alt={match.team1_name}
                          className="w-8 h-6"
                        />
                      </div>

                      <div className="text-lg font-semibold flex items-center justify-center  mx-5">
                        {match.score_team1} - {match.score_team2}
                      </div>

                      <div className="flex items-center justify-begin gap-1 w-1/4">
                        <img
                          src={`https://flagcdn.com/w320/${getCountryCode(
                            match.team2_name
                          ).toLowerCase()}.png`}
                          alt={match.team2_name}
                          className="w-8 h-6"
                        />
                        <span className="text-sm md:text-lg font-semibold">
                          {match.team2_name}
                        </span>
                      </div>
                    </div>

                    <div className="w-1/4 text-right text-gray-500 flex-shrink-0">
                      FT
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Matches;
