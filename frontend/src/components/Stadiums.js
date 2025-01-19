import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Stadiums = () => {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/stadiums")
      .then((response) => {
        setStadiums(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the stadiums!", error);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar />
      <Sidebar />
      <div className="w-full">
        <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center">
          <div className="flex flex-row items-center ml-10 mt-[20%] sm:mt-[15%] md:mt-[22%] xl:mt-[14%] md:ml-[15%] xl:ml-[10%] md:pb-[5.7rem]">
            <h1 className="text-3xl font-bold text-white ml-5">Stadiums</h1>
          </div>
        </div>

        <div className="stadiums-container p-10 md:ml-[4%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stadiums.map((stadium) => (
            <div
              key={stadium.id}
              className="stadium-card relative w-full h-64 rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${stadium.link})` }}
            >
              <div className="overlay absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                <h2 className="text-3xl font-bold">{stadium.name}</h2>
                <p className="text-xl">{stadium.city}</p>
                <p className="text-xl">Capacity: {stadium.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stadiums;
