import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import img from "../assets/12146011_Wavy_Gen-01_Single-07.jpg";
import { login } from '../services/authAPI';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;
  const { loading } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="container mx-auto p-6 md:flex md:items-center md:justify-center">
          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8 md:max-w-2xl md:flex md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <p className="text-gray-600 mb-6">
                Welcome Back to Postup! Enter using your email.
              </p>

              <form onSubmit={handleOnSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-9 cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#6B7280" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#6B7280" />
                    )}
                  </span>
                  <Link to="/forgot-password">
                    <p className="mt-1 mr-auto max-w-max text-xs text-blue-800">
                      Forgot Password
                    </p>
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Log In
                </button>
              </form>
              <div className="flex justify-center mt-2">
                <p className="mt-2 max-w-max text-xs">
                  Not Registered yet? <Link to="/signup"> <span className=' text-blue-800'>Signup</span></Link>
                </p>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img src={img} alt="Signup" className="rounded-lg mt-[22%]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
