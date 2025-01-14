import React, { useState } from 'react';
import logo from "../images/logos/favicon.ico";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_base_url } from '../helper';

// Importing the material icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        pwd: pwd
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        // Store token and login status
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);

        // Navigate to the home page
        toast.success("Logged in successfully!", { position: "top-center", autoClose: 2000 });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error(data.msg, { position: "top-center", autoClose: 3000 });
      }
    }).catch(err => {
      toast.error("An error occurred. Please try again.", { position: "top-center", autoClose: 3000 });
      console.error("Login error:", err);
    });
  };

  return (
    <div className="con flex flex-col items-center justify-center min-h-screen px-4">
      <form onSubmit={submitForm} className='w-full max-w-md flex flex-col items-center bg-[#0f0e0e] p-6 rounded-lg shadow-xl shadow-black/50'>
        <img className='w-56 object-cover mb-4' src={logo} alt="Logo" />

        <div className="inputBox w-full mb-4">
          <input
            onChange={(e) => { setEmail(e.target.value) }}
            value={email}
            type="email"
            placeholder='Email'
            required
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="inputBox w-full mb-4 relative">
          <input
            onChange={(e) => { setPwd(e.target.value) }}
            value={pwd}
            type={showPassword ? "text" : "password"} // Toggle password type
            placeholder='Password'
            required
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-white text-lg"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
          >
            {showPassword ? (
              <VisibilityOff /> // Material Design "VisibilityOff" icon
            ) : (
              <Visibility /> // Material Design "Visibility" icon
            )}
          </span>
        </div>

        <p className='text-gray-400 text-sm mt-3 self-start'>Don't have an account? <Link to="/signUp" className='text-blue-500'>Sign Up</Link></p>

        <button className="btnNormal mt-3 bg-blue-500 transition-all hover:bg-blue-600 w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
