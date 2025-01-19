import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import Navbar from "./Navbar";

function UpdatePlayer() {
  const { teamName, playerId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState({
    firstname: "",
    lastname: "",
    position: "",
    goals: "",
    assists: "",
    birth_date: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/teams/${teamName}/players/${playerId}`)
      .then((response) => {
        setPlayer(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching player data", error);
      });

  }, [teamName, playerId]);

  const handleUpdatePlayerChange = (e) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleUpdatePlayerSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8081/teams/${teamName}/players/${playerId}`,
        player
      )
      .then(() => {
        alert("Player updated successfully!");
        navigate(`/teams/${teamName}`);
      })
      .catch((error) => {
        console.error("Error updating player", error);
      });
  };

  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 ">
        <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center">
          <div className="flex flex-row items-center ml-10 mt-[20%] sm:mt-[15%] md:mt-[22%] xl:mt-[14%] md:ml-[15%] xl:ml-[10%] md:pb-[5.7rem]">
            <h1 className="text-3xl font-bold text-white ml-5">
              Update Player for {teamName}
            </h1>
          </div>
        </div>
        <form
          onSubmit={handleUpdatePlayerSubmit}
          className="p-4 bg-white rounded-md shadow-md w-96 mt-10 mb-[15%] md:mb-0"
        >
          <h2 className="text-2xl font-bold mb-4">Update Player</h2>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={player.firstname}
            onChange={handleUpdatePlayerChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={player.lastname}
            onChange={handleUpdatePlayerChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <select
            name="position"
            value={player.position}
            onChange={handleUpdatePlayerChange}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Select Position</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
          </select>
          <input
            type="number"
            name="goals"
            placeholder="Goals"
            value={player.goals}
            onChange={handleUpdatePlayerChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="number"
            name="assists"
            placeholder="Assists"
            value={player.assists}
            onChange={handleUpdatePlayerChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            name="birth_date"
            value={player.birth_date}
            onChange={handleUpdatePlayerChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            type="submit"
            className="bg-[#3A034B] text-white p-2 rounded-md mt-2 w-full hover:bg-[#550065]"
          >
            Update Player
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePlayer;
