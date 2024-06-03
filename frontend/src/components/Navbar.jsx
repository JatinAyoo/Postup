import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/authAPI'; // Make sure you have a logout function in your authAPI
import { Link, useNavigate } from 'react-router-dom'; // If you are using react-router for navigation
import toast from 'react-hot-toast';
import defaultImg from "../assets/user.png";
import postupimg from "../assets/PostUp.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let LoggedIn = false;
  const { image, username, email } = useSelector((state) => {
    if (state.profile.user) {
      LoggedIn = true;
      return state.profile.user;
    }
    LoggedIn = false;
    return { image: defaultImg, username: "", email: "" };
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout(navigate));
    toast.success("Logged out successfully");
  };

  const toggleDropdown = () => {
    if(LoggedIn) {
      setDropdownOpen(!dropdownOpen)};
  };




  return (
    <div className={`sticky top-0 z-50 }`}>
      <nav className="bg-white border-gray-200 dark:bg-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={postupimg} className="h-10 rounded-full" alt="Postup Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Postup</span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-700 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img src={image} className="w-8 h-8 rounded-full bg-white" alt="user" />
            </button>

            {dropdownOpen && (
              <div className="z-50 mt-56 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{username}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/saved-posts"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Saved Posts
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-700 md:dark:bg-gray-700 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3text-gray-700 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
              </li>
              {!LoggedIn ? <li>
                <Link to="/signup" className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">SignUp</Link>
              </li> : <></>}

              {!LoggedIn ? <li>
                <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">SignIn</Link>
              </li> : <></>}
              
              <li>
                <Link to="/features" className="block py-2 px-3text-gray-700 rounded  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Features</Link>
            </li>
            <li>
            <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
            </li>
            {LoggedIn ? <li>
            <Link to="/contact" className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Posts</Link>
            </li> : <></>}
            </ul>
            </div>
            </div>
            </nav>
            </div>
            );
            };

export default Navbar;