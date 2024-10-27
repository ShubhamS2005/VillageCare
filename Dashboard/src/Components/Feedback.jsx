import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Feedback = () => {
  const [feedback,setFeedback]=useState([])
  const{isAuthenticated}=useContext(Context)
  useEffect(()=>{
    const fetchFeedback=async()=>{
      try {
        const {data}=await axios("http://localhost:8000/api/v1/user/getallmessages",{withCredentials:true})
        setFeedback(data.messages)


      } catch (error) {
        console.log("Error occured while fetching messages ",error)
      }
    }
    fetchFeedback()
  },[])
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return(
    <section className='page messages'>
      <h1>Feedback</h1>
      <div className='banner'>

      {feedback && feedback.length > 0 ? (
          feedback.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstname}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastname}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No FeedBacks!</h1>
        )}
      </div>


      
    </section>
  )
}

export default Feedback
