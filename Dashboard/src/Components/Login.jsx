import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate ,Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
    const {isAuthenticated,setIsAuthenticated}=useContext(Context);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const navigateTo=useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password, confirmPassword, role: "Admin" },
        {
        withCredentials:true,
        headers:{'Content-Type':"application/json"}
      }).then((res)=>{
        toast.success(res.data.message)
        setIsAuthenticated(true)
        navigateTo("/")
        setEmail("");
          setPassword("");
          setConfirmPassword("");
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  } 
  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }
  return (
    <>
      <div className="container ">
    <div className="login">
    <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center animate-slideIn delay-100">Welcome to VillageCare</h1>
    <p className="text-sm text-gray-600 mb-6 text-center animate-slideIn delay-200">Only Admins are allowed to access these resources</p>
        
        <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105'
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105'
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>setConfirmPassword(e.target.value)}
              className='px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105'
            />
            <div>

            <button type="submit" className="Submit">Login</button>
            </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
