import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


export const Context=createContext({isAuthenticated:false})

const Appwraper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [User,setUser]=useState({})
  const [id,setId]=useState("")
  const [id2,setId2]=useState("")



  return (
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,User,setUser,id,setId,id2,setId2}}>
    <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Appwraper/>
)
