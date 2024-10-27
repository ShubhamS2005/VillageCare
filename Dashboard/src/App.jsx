import React, { useContext ,useEffect} from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main.jsx'
import axios from "axios"
import './App.css'

import Login from "./Components/Login.jsx"
import Messages from "./components/Messages.jsx"
import Dashboard from "./components/Dashboard.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Rural from './Components/Rural.jsx';
import AddNewAdmin from './Components/AddNewAdmin.jsx';
import Service from './Components/Service.jsx';
import Feedback from './Components/FeedBack.jsx';




function App() {
  const{isAuthenticated,setIsAuthenticated,setUser}=useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
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
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <Router>
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/messages' element={<Messages/>}/>
      <Route path='/rural' element={<Rural/>}/>
      <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
      <Route path='/service' element={<Service/>}/>
      <Route path='/feedback' element={<Feedback/>}/>



    </Routes>

   <ToastContainer position='top-center'/>
   </Router>
    </>
  )
}

export default App
