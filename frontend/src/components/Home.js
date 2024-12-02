import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import ImageSlider from "./ImageSlider";
import Teams_images_home from "./Teams_images_home";

const Home = () => {
  

  return (
    <div className="flex flex-col">
      <div className="flex">
        <SideBar />
        <Navbar />
      </div>

      <div className="flex-1 flex justify-center items-center bg-[#550065] overflow-y-auto">
        <ImageSlider />
      </div>
      <Teams_images_home/>
      
      
    </div>
  );
};

export default Home;
