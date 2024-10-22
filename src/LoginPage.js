import { useState } from "react";
import STADIUM_LOGIN from "./assets/stadium_login.jpg";

const Login = () => {
  const [action, setAction] = useState("Sign In");

  return (
    <div className="w-full h-screen flex flex-col md:flex-row font-poppins">
      {/* Left Section */}
      <div className="relative w-full md:w-[60%] h-[50vh] md:h-full flex flex-col">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        {/* FIFA Logo */}
        <div className="absolute top-5 left-5 z-10">
          <h2 className="text-3xl md:text-4xl text-white font-bold">FIFA</h2>
        </div>
        {/* Main Heading */}
        <div className="absolute top-[25%] left-[10%] z-10 flex flex-col">
          <h1 className="text-5xl md:text-7xl text-white font-extrabold">
            Football at your fingertips.
          </h1>
          <p className="text-lg md:text-2xl text-white font-semibold pt-5">
            Sign up to access the FIFA World Cup 2022.
          </p>
        </div>
        {/* Background Image */}
        <img
          src={STADIUM_LOGIN}
          className="w-full h-full object-cover"
          alt="stadium"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[40%] min-h-[50vh] md:min-h-screen bg-white flex flex-col p-10 md:p-20 justify-between">
        {/* Action Heading */}
        <div className="w-full flex flex-col">
          <h3 className="text-3xl md:text-4xl font-semibold">{action}</h3>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col">
          {/* Email Field */}
          <div className="pt-10">
            <p className="text-base md:text-lg font-medium">Email</p>
            <input
              type="email"
              className="w-full text-black pl-3 py-2 border-b border-black focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Username Field (Only for Sign Up) */}
          {action === "Sign In" ? (
            <div></div>
          ) : (
            <div className="pt-10">
              <p className="text-base md:text-lg font-medium">Username</p>
              <input
                type="text"
                className="w-full text-black pl-3 py-2 border-b border-black focus:outline-none focus:border-gray-500"
              />
            </div>
          )}

          {/* Password Field */}
          <div className="pt-10">
            <p className="text-base md:text-lg font-medium">Password</p>
            <input
              type="password"
              className="w-full text-black pl-3 py-2 border-b border-black focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {/* Buttons and Links */}
        {action === "Sign In" ? (
          <>
            <div>
              <button
                className="ml-4 rounded-[50px] bg-blue-600 text-white border-solid border-2 pt-3 pb-3 pr-5 pl-5 text-[11px] hover:bg-blue-700 mb-4 md:mb-6 lg:mb-8 mt-4 uppercase"
                onClick={() => setAction("Sign In")}
              >
                Sign In
              </button>
            </div>
            <div className="w-full">
              <p className="text-gray-700">Don't have an account?</p>
              <button
                className="ml-4 mt-4 rounded-[50px] border-black bg-white border-solid border-2 pt-3 pb-3 pr-5 pl-5 text-[11px] hover:bg-gray-200 hover:border-gray-600 mb-4 md:mb-6 lg:mb-8 uppercase"
                onClick={() => setAction("Sign Up")}
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                className="ml-4 rounded-[50px] bg-blue-600 text-white border-solid border-2 pt-3 pb-3 pr-5 pl-5 text-[11px] hover:bg-blue-700 mb-4 md:mb-6 lg:mb-8 mt-4 uppercase"
                onClick={() => setAction("Sign Up")}
              >
                Sign Up
              </button>
            </div>
            <div className="w-full">
              <p className="text-gray-700">Already have an account?</p>
              <button
                className="ml-4 mt-4 rounded-[50px] border-black bg-white border-solid border-2 pt-3 pb-3 pr-5 pl-5 text-[11px] hover:bg-gray-200 hover:border-gray-600 mb-4 md:mb-6 lg:mb-8 uppercase"
                onClick={() => setAction("Sign In")}
              >
                Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
