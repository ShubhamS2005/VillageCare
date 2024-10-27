import { useContext, useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import 'regenerator-runtime/runtime';



import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main.jsx'
import axios from 'axios'
import Navbar from "./components/Navbar.jsx"
import  Footer from "./components/Footer.jsx"
import Dashboard from "./components/Dashboard.jsx"
import AboutUs from './components/AboutUs.jsx'
import Update from './components/Update.jsx'
import Appointment from './components/Appointment.jsx'
import CropRecommendation from './components/Crop_recomendation.jsx'
import Services from './components/services.jsx'
import Home from './components/Home.jsx'
import CropPricePrediction from './components/CropPricePrediction.jsx'
import Chat from './components/chat.jsx'
import Weather from './components/Weather.jsx'
import VoiceNavigation from './components/VoiceNavigation.jsx'



function App() {
  const {User,isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      if(User.role==="Rural"){
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/user/rural/me",
            {
              withCredentials: true,
            }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setUser({});
        }
      }else if(User.role==="ServiceProvider"){
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/user/Service/me",
            {
              withCredentials: true,
            }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setUser({});
        }
      }else if(User.role==="LocalAdmin"){
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/user/localAdmin/me",
            {
              withCredentials: true,
            }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setUser({});
        }
      }else{
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/user/admin/me",
            {
              withCredentials: true,
            }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setUser({});
        }
      }
      
    };
    fetchUser();
  }, [isAuthenticated]);
  
  return (
    <>
    <Router>
      <Navbar/>
      <VoiceNavigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/weather' element={<Weather/>}/>

          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/update' element={<Update/>}/>
          <Route path="/bookappointment" element={<Appointment/>}/>
          <Route path="/crop_recomendation" element={<CropRecommendation/>}/>
          <Route path="/price_predict" element={<CropPricePrediction/>}/>

          <Route path="/services" element={<Services/>}/>




         
      </Routes>
      <Footer/>
      <ToastContainer position='top-center'/>
      <Chat/>
    </Router>
    </>
  )
}

export default App
