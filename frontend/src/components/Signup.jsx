import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import img from "../assets/4957136_4957136.jpg";
import { sendOtp } from "../services/authAPI";
import { setSignupData } from "../slices/authSlice";
import { Link } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { username, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    // console.log(formData)
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(formData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="container mx-auto p-6 md:flex md:items-center md:justify-center">
          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8 md:max-w-2xl md:flex md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <p className="text-gray-600 mb-6">
                Welcome to Postup! Enter required details to continue.
              </p>

              <form onSubmit={handleOnSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleOnChange}
                    placeholder="Enter username"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

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
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-9 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#6B7280" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#6B7280" />
                    )}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Create Account
                </button>
                <div className="flex justify-center">
                <p className="mt-1 max-w-max text-xs">
                  Already have an account? <Link to="/login"> <span className=' text-blue-800'>Login</span></Link>
                </p>
              </div>
              </form>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img src={img} alt="Signup" className="rounded-lg mt-[30%]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupForm;
