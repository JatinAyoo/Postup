import React from "react";
import Navbar from "./components/Navbar";

import {Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import OpenRoute from "./components/OpenRoute";
import Posts from "./components/Posts";
import Features from "./components/Features";
import SavedPosts from "./components/SavedPosts";
import PrivateRoute from "./components/PrivateRoute";
import VerifyMail from "./components/Verify-Email";

import UpdatePassword from "./components/UpdatePassword";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {

  return (
    <div>
      
        <Navbar />
        <Routes>
          <Route exact path="/" 
                            element={
                              <PrivateRoute>
                                <Posts />
                              </PrivateRoute>
                            } />
          <Route 
                path="signup" 
                element={
                  <OpenRoute>
                  <Signup />
                  </OpenRoute>
                }
              />
          <Route
                path="login"
                element={
                  <OpenRoute>
                    <Login />
                  </OpenRoute>
                }
              />

          <Route
                path="posts"
                element={
                  <PrivateRoute>
                    <Posts />
                  </PrivateRoute>
                }
              />
              <Route
                path="saved-posts"
                element={
                  <PrivateRoute>
                    <SavedPosts />
                  </PrivateRoute>
                }
              />
          

          <Route
                path="forgot-password"
                element={
                  <OpenRoute>
                    <ForgotPassword />
                  </OpenRoute>
                }
              />  

          <Route
              path="verify-email"
              element={
                <OpenRoute>
                  <VerifyMail />
                </OpenRoute>
              }
            />  

          <Route
              path="update-password/:id"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />  

          <Route
              path="features"
              element={
               
                  <Features />
                
              }
            /> 

        </Routes>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
