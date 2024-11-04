import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {FaHome} from "react-icons/fa";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

const Home = ({open}) => {
    return (
      <div>
        
          <Navbar />
          <SideBar />
      </div>
    );
}

export default Home;