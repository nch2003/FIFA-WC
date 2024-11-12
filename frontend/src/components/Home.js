import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import ImageSlider from "./ImageSlider";

const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <Navbar />
      <div className="flex-1 flex justify-center items-center bg-[#550065] overflow-y-auto">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Home;
