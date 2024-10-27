import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import "./index.css"

export const Context=createContext({isAuthenticated:false})

const AppWraper=()=>{
  const[isAuthenticated,setIsAuthenticated]=useState(false)
  const[user,setUser]=useState(false)
  const [id,setId]=useState(false)
  const [id2,setId2]=useState(false)

  return(
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,id,setId,id2,setId2}}>
      <App/>
    </Context.Provider>

  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppWraper/>
)
