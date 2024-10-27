import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Lobby from "./Pages/Lobby.jsx"
import Room from "./Pages/Room.jsx"


function App() {
  

  return (
    <>
      <Router>
    <Routes>
      <Route path='/lobby' element={<Lobby/>}/>
      <Route path='/room' element={<Room/>}/>
    </Routes>
   </Router>
    </>
  )
}

export default App
