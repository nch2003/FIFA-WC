import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

function UpdateTeam() {
  const { teamName } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    coach: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/teams/${teamName}`)
      .then((response) => {
        setFormData(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, [teamName]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      newName: formData.name,
      coach: formData.coach,
    };

    axios
      .put(`http://localhost:8081/teams/${teamName}`, updatedData)
      .then((response) => {
        alert("Team updated successfully!");
        navigate("/teams");
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-[#3A034B] w-full h-40 md:h-64 flex items-center">
          <div className="flex flex-row items-center ml-10 mt-[10%] sm:mt-[15%] md:mt-[22%] xl:mt-[14%] md:ml-[15%] xl:ml-[10%] md:pb-[5.7rem]">
            <h1 className="text-3xl font-bold text-white ml-5">Update Team</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-10 mb-10">
          <h1 className="text-3xl font-bold mb-8">{teamName}</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow-lg rounded-lg w-96"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-2">
                Team Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="coach" className="block font-semibold mb-2">
                Coach Name
              </label>
              <input
                type="text"
                id="coach"
                name="coach"
                value={formData.coach}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#3A034B] text-white px-4 py-2 rounded-lg hover:bg-[#550065]"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTeam;
