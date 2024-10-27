import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main.jsx"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'


const Tourists = () => {
  const [rurals, setRurals] = useState([])
  const { isAuthenticated } = useContext(Context)
  useEffect(() => {
    const fetchRurals = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/rural",
           { withCredentials: true }
          )
          setRurals(data.rural)

      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchRurals()
  })
  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }
  return (
    <section className='page Tourists'>
        <h1>Rural Citizens</h1>
      <div className="banner">
        {
          rurals && rurals.length>0 ? (rurals.map(element=>{
            return(
              <div className="card" >
                <img src={element.userAvatar && element.userAvatar.url} alt="User Avatar" />
                <h4>{`${element.firstname} ${element.lastname}`}</h4>
                <div className="details" >
                  <p>Email: <span>{element.email}</span></p>
                  <p>Phone: <span>{element.phone}</span></p>

                </div>
              </div>
            )
          })):<h1>No Tourists Found</h1>
        }
      </div>

    </section>
  )
}

export default Tourists
