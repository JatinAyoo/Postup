import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import postReducer from "../slices/postSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    posts: postReducer,
})

export default rootReducer