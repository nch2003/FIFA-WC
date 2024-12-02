import React from "react";
import SideBar from "./Sidebar";
import Navbar from "./Navbar";
import img from "../assets/blue_image.jpg";
import Teams_images from "./Teams_images";


function Teams() {
  return (
    <div className="flex">
      <SideBar />
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Teams_images/>
      </div>
    </div>
  );
}

export default Teams;
