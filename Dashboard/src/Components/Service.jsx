import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main.jsx"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

const Service = () => {
  const [service, setServices] = useState([])
  const { isAuthenticated } = useContext(Context)
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/service",
           { withCredentials: true }
          )
          setServices(data.services)

      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchService()
  })
  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }
  return (
    <section className='page Tourists'>
        <h1>Service Provider </h1>
      <div className="banner">
        {
          service && service.length>0 ? (service.map(element=>{
            return(
              <div className="card" >
                <img src={element.userAvatar && element.userAvatar.url} alt="Service Avatar" />
                <h4>{`${element.firstname} ${element.lastname}`}</h4>
                <div className="details">
                  <p>Email: <span>{element.email}</span></p>
                  <p>Phone: <span>{element.phone}</span></p>

                </div>
              </div>
            )
          })):<h1>No Service Provider Found</h1>
        }
      </div>

    </section>
  )
}

export default Service
