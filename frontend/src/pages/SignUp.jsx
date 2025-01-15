import React, { useState } from 'react';
import logo from "../images/logos/favicon.ico";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';

// Importing Material UI icons for visibility toggle
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        navigate("/login");
      } else {
        toast.error(data.msg);
      }
    })
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center min-h-screen px-4">
        <form onSubmit={submitForm} className='w-full max-w-md flex flex-col items-center bg-[#0f0e0e] p-6 rounded-lg shadow-xl shadow-black/50'>
          <img className='w-56 object-cover mb-4' src={logo} alt="Logo" />

          <div className="inputBox w-full mb-4">
            <input 
              onChange={(e) => { setFullName(e.target.value) }} 
              value={fullName} 
              type="text" 
              placeholder='Full Name' 
              required 
              className="w-full p-2 rounded bg-gray-800 text-white" 
            />
          </div>

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

          <p className='text-gray-400 text-sm mt-3 self-start'>
            Already have an account? <Link to="/login" className='text-blue-500'>Login</Link>
          </p>

          <button className="btnNormal mt-3 bg-blue-500 transition-all hover:bg-blue-600 w-full py-2 rounded">Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default SignUp;
