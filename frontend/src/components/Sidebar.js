import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import arrow from "../assets/control.png";
import logo from "../assets/WorldCupLogo.jpg";
import { GoHome } from "react-icons/go";
import { IoShirtOutline, IoPersonOutline } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { MdOutlineStadium } from "react-icons/md";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const Menus = [
    { title: "Home", icon: <GoHome />, link: "/home" },
    { title: "Players", icon: <IoShirtOutline />, link: "", gap: true },
    { title: "Teams", icon: <GiWorld />, link: "" },
    { title: "Matches", icon: <IoIosFootball />, link: "", gap: true },
    { title: "Stadiums", icon: <MdOutlineStadium />,  },
    {
      title: "Profile",
      icon: <IoPersonOutline />,
      acc: true,
    },
  ];

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  const handleClickOutside = () => {
    setOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  if (width > breakpoint) {
    return (
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            open ? "w-72" : "w-20"
          } bg-[#550065] p-5 pt-8 duration-300 z-40 fixed h-full flex flex-col`}
        >
          <img
            src={arrow}
            className={`absolute cursor-pointer -right-3 top-11 w-7 border-dark-purple border-2 rounded-full rotate-180 ${
              open && "rotate-0 top-9"
            }`}
            onClick={() => setOpen(!open)}
          />

          <div className="flex justify-center">
            <Link to="/home" className={`cursor-pointer duration-500 w-[50%] mt-5 ${
                  open && "rotate-[360deg] pt-0"
                }`}
                alt="World Cup Logo">
              
              <img
                src={logo}
                
              />
            </Link>
          </div>

          <ul className="pt-6 flex flex-col flex-1">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:text-[#D5C46C] text-gray-300 text-sm items-center gap-x-4 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${Menu.acc ? "mt-auto" : ""}`}
                onClick={
                  Menu.title === "Profile" ? handleProfileClick : undefined
                }
              >
                <Link
                  to={Menu.link}
                  className="flex items-center gap-x-4 w-full"
                >
                  {" "}
                  {/* Link component added here */}
                  <span className="text-2xl" onClick={() => setOpen(!open)}>
                    {Menu.icon}
                  </span>
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-200 text-sm`}
                  >
                    {Menu.title}
                  </span>
                </Link>
                {/* Profile Dropdown */}
                {Menu.title === "Profile" && isProfileDropdownOpen && open && (
                  <ul className="bg-white absolute left-full ml-4 mt-2 w-32 rounded-lg shadow-lg text-black">
                    <li className="p-2 hover:bg-slate-200 hover:rounded-lg">
                      <Link to="/login">Sign Out</Link>
                    </li>
                    <li className="p-2 hover:bg-slate-200 hover:rounded-lg">
                      <Link to="/signup">Sign Up</Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main content overlay when sidebar is open */}
        {open && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={handleClickOutside}
          ></div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Mobile view */}
      <div
        className={`bg-[#550065] w-full duration-300 z-40 fixed bottom-0 flex flex-col items-center ${
          open ? "h-[80vh]" : "h-20"
        }`}
      >
        <div className="flex justify-center w-full cursor-pointer">
          <img
            src={arrow}
            className={`w-7 border-dark-purple border-2 rounded-full -mb-4 ${
              open ? "-rotate-90" : "rotate-90"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <Link to="/">
          {" "}
          {/* Wrap logo with Link for mobile */}
          <img
            src={logo}
            className={`${
              open ? "rotate-[360deg]" : "hidden"
            } cursor-pointer duration-500 w-24 mt-4`}
            alt="World Cup Logo"
          />
        </Link>
        <ul
          className={`flex ${
            open ? "flex-col items-center space-y-4" : "justify-evenly"
          } w-full pt-3`}
        >
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex items-center cursor-pointer hover:text-[#D5C46C] text-gray-300 text-sm ${
                open ? `${Menu.gap ? "mt-9" : ""} p-3` : "p-2"
              }`}
              onClick={
                Menu.title === "Profile" ? handleProfileClick : undefined
              }
            >
              <Link to={Menu.link} className="flex items-center gap-x-4 w-full">
                {" "}
                {/* Link component for mobile */}
                <span className="text-2xl" onClick={() => setOpen(!open)}>
                  {Menu.icon}
                </span>
                {open && <span className="ml-2">{Menu.title}</span>}
              </Link>
              {/* Profile Dropdown for Mobile */}
              {Menu.title === "Profile" && open && isProfileDropdownOpen && (
                <ul className="bg-white rounded-lg shadow-lg text-black w-32 mt-2 absolute mb-[13%] ml-[17%]">
                  <li className="p-2 hover:bg-slate-200 hover:rounded-lg">
                    <Link to="/login">Sign Out</Link>
                  </li>
                  <li className="p-2 hover:bg-slate-200 hover:rounded-lg">
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={handleClickOutside}
        ></div>
      )}
    </div>
  );
};

export default SideBar;
