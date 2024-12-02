import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InsertTeam() {
  const [formData, setFormData] = useState({
    name: "",
    coach: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/insert-team", formData)
      .then((response) => {
        alert("Team inserted successfully!");
        navigate("/teams");
      })
      .catch((error) => {
        console.error("There was an error inserting the team!", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Insert Team</h1>
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InsertTeam;
