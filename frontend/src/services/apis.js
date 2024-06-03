const dotenv = require("dotenv");

dotenv.config();
// const BASE_URL = "http://localhost:4000/api/v1";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log(REACT_APP_BASE_URL);
// console.log(REACT_APP_BASE_URL);
const BASE_URL = REACT_APP_BASE_URL;

//Auth Endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const postEndpoints = {
    GETPOST_API: BASE_URL + "/post/getPost",
    CREATEPOST_API: BASE_URL + "/post/createPost",
    SAVEPOST_API: BASE_URL + "/post/bookmark",
    UNSAVEPOST_API: BASE_URL + "/post/unbookmark",
    SAVEDPOST_API: BASE_URL + "/post/savedPost",
}
