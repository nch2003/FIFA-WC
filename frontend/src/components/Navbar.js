import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import logo from "../assets/WorldCupLogo.jpg";
import FIFA from "../assets/FIFA_logo.jpg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const Menus = [
    { title: "Home", link: "/home" },
    { title: "Teams", link: "/teams" },
    { title: "Players", link: "/players" },
    { title: "Matches", link: "/matches" },
    { title: "Stadiums", link: "/stadiums" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-[#550065] fixed w-full z-50 flex justify-between border-b-[1px] py-2">
        <img
          src={FIFA}
          className="w-[9%] md:w-[3.5%] ml-3 mt-1 mb-1"
          alt="FIFA Logo"
        />
      </div>
      <div className="flex-no-wrap fixed h-[6rem] z-20 flex w-full items-center justify-between bg-[#550065] py-2 2xl:h-[7rem]">
        <div className="flex items-center w-full mt-4">
          <Link
            to="/home"
            className="w-[18%] mr-4 ml-3 mt-7 sm:w-[14%] md:w-[8%] md:ml-[12%] xl:ml-[9%] 2xl:w-[6%]"
            alt="World Cup Logo"
          >
            <img src={logo} />
          </Link>

          <div className="flex overflow-x-auto w-[90%] mt-4 md:items-center md:justify-evenly no-scrollbar">
            {Menus.map((Menu, index) => (
              <div
                key={index}
                className="flex items-center justify-between min-w-[100px] text-white text-sm font-semibold"
              >
                <Link to={Menu.link} className="text-white">{Menu.title}</Link>
              </div>
            ))}
          </div>

          <div className="relative" ref={dropdownRef}>
            <IoPersonOutline
              className="text-white text-2xl flex items-center mr-4 mt-4 cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-6 bg-white rounded-lg shadow-lg w-32 md:w-40 z-10">
                <ul className="text-lg text-black">
                  <li className="hover:bg-slate-200 hover:rounded-lg">
                    <Link to="/login" onClick={() => setIsDropdownOpen(false)}>
                      Sign Out
                    </Link>
                  </li>
                  <li className="hover:bg-slate-200 hover:rounded-lg">
                    <Link to="/signup" onClick={() => setIsDropdownOpen(false)}>
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
