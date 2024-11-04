import STADIUM_LOGIN from "./assets/stadium_login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import validation from "./SignUpValidation";


const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if(errors.email === "" && errors.password === "" && errors.name === "") {   
      axios.post("http://localhost:8081/signup", values).then(res => {
        console.log(res)
        navigate("/login");
      }).catch(err => console.log(err));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row font-poppins">
      {/* Left Section */}
      <div className="relative w-full md:w-[60%] h-[50vh] md:h-full flex flex-col">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        {/* FIFA Logo */}
        <div className="absolute top-10 left-10 z-10">
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
      <div className="w-full md:w-[40%] min-h-[50vh] md:min-h-screen bg-white flex flex-col p-10 md:p-20 justify-between overflow-y-auto">
        {/* Action Heading */}
        <div className="w-full flex flex-col">
          <h3 className="text-3xl md:text-4xl font-semibold">Sign Up</h3>
        </div>
        {/* Form */}
        <form action="" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            {/* Email Field */}
            <div className="pt-10">
              <p className="text-base md:text-lg font-medium">Email</p>
              <input
                type="email"
                name="email"
                onChange={handleInput}
                className="w-full text-black pl-3 py-2 border-b border-black focus:outline-none focus:border-gray-500"
              />
              {errors.email && (
                <span className="text-red-700">{errors.email}</span>
              )}
            </div>

            {/* Username Field */}
            <div className="pt-10">
              <p className="text-base md:text-lg font-medium">Username</p>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                className="w-full text-black pl-3 py-2 border-b border-black focus:outline-none focus:border-gray-500"
              />
              {errors.name && (
                <span className="text-red-700">{errors.name}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="pt-10">
              <p className="text-base md:text-lg font-medium">Password</p>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                className="w-full text-black pl-3 py-2 border-b border-black focus:outline-none focus:border-gray-500"
              />
              {errors.password && (
                <span className="text-red-700">{errors.password}</span>
              )}
            </div>
          </div>
          {/* Buttons and Links */}
          <div>
            <button
              type="submit"
              className="ml-4 rounded-[50px] bg-blue-600 text-white border-solid border-2 pt-3 pb-3 pr-5 pl-5 text-[11px] hover:bg-blue-700 mb-4 md:mb-6 lg:mb-8 mt-4 uppercase"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <p className="text-gray-700 mb-4">Already have an account?</p>
          <Link
            to="/login"
            className="ml-4 mt-4 rounded-[50px] border-black bg-white border-solid border-2 pt-3 pb-3 pr-5 pl-5 text-[11px] hover:bg-gray-200 hover:border-gray-600 mb-4 md:mb-6 uppercase text-decoration-none"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
