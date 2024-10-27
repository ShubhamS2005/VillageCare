import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createContext, useState } from 'react'

export const Context=createContext({isAuthenticated:false})
const AppWraper=()=>{
  const[name,setName]=useState("")
  return(
    <Context.Provider value={{name,setName}}>
      <App/>
    </Context.Provider>

  )
}
createRoot(document.getElementById('root')).render(
    <AppWraper />
)
