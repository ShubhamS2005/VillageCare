import React, { useContext, useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Context} from "../main.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import {NavLink } from "react-router-dom";
import logo from "./logo.png";

import axios from 'axios'
import "./Navbar.css"
import VoiceNavigation from './VoiceNavigation.jsx';

const Navbar = () => {
  const contentSize = document.getElementsByClassName("content");
  // const style = window.getComputedStyle(contentSize).fontSize;
    const [fontSize, setFontSize] = useState(20); // Starting font size in pixels
  
    const increaseFontSize = () => {
      const newSize = fontSize + 2;
      setFontSize(newSize);
      Array.from(contentSize).forEach((contentSize) => {
        contentSize.style.fontSize = `${newSize}px`;
        
      })
      
  }
  
    const decreaseFontSize = () => {
      const newSize = fontSize - 2;
      if (newSize >= 10) { // Prevents font size from getting too small
        setFontSize(newSize);
        let contentSize = document.getElementsByClassName("content");
        Array.from(contentSize).forEach((contentSize) => {
          contentSize.style.fontSize = `${newSize}px`;
          
        })      
      }
    };
  const {isAuthenticated,setIsAuthenticated }=useContext(Context)
  const {User}=useContext(Context)
  const navigateto=useNavigate()
    const handleLogout=async()=>{
      if(User.role==="Rural"){
        await axios.get(
          "http://localhost:8000/api/v1/user/rural/logout",{
          withCredentials:true
        }).then(res=>{
          toast.success(res.data.message)
          setIsAuthenticated(false)
          navigateto("/home")
        }).catch(err=>{
          toast.error(err.response.data.message)
        })
      }else if(User.role==="ServiceProvider"){
        await axios.get(
          "http://localhost:8000/api/v1/user/Service/logout",{
          withCredentials:true
        }).then(res=>{
          toast.success(res.data.message)
          setIsAuthenticated(false)
          navigateto("/home")

        }).catch(err=>{
          toast.error(err.response.data.message)
        })
      }
      
  }
  const gotoLogin=async()=>{
    navigateto("/login")
  }
  return (
    <>
      <nav className='flex gap-10 bg-white h-[12vh] w-full justify-between items-center'>
        <div className='text-black font-bold text-xl ml-20'>
          <div className='flex gap-2 justify-center items-center'>
            <img className='w-[92px] h-[92px]' src={logo} alt="" />
            
            <h1>Village Care</h1>
          </div> 
        </div>
        <div className="ml-20">
          <img width={150} src="/logo-png.png" alt="" />
        </div>
        <div className="flex justify-center items-center">


        <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={"block py-2 px-3  rounded md:bg-transparent  md:p-0 "}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={"block py-2 px-3  rounded md:bg-transparent  md:p-0 "}
                >
                  About
                </NavLink>
              </li>
              <NavLink
                  to="/services"
                  className={"block py-2 px-3  rounded md:bg-transparent  md:p-0 "}
                >
                  Services
                </NavLink>
              
              <li>
                <Link
                  to="/feedback"
                  className={"block py-2 px-3  rounded md:bg-transparent  md:p-0 "}
                >
                  Contact
                </Link>
              </li>
              
            
              
              
            </ul>
          </div>
          

          
          </div>
          

        <div className="flex justify-center items-center mr-16">
      <button  className="relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-black">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
        {isAuthenticated?(
        <button className='logoutBtn btn' onClick={handleLogout}>
          LOGOUT
          </button>
        ):(
          <button className='logoutBtn btn' onClick={gotoLogin}>
          LOGIN
          </button>
          )
        } 
        </span>
      </button>
      
      <button type="button" onClick={()=>increaseFontSize()}
      className="text-black focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  ">+A</button>
      <button type="button" onClick={decreaseFontSize} className="text-black focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  ">-A</button>
      </div>
      {/* <VoiceNavigation/> */}

      </nav><hr className='my-4' />
    </>
  )
}

export default Navbar