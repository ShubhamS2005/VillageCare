import React, { useContext, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context)
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userAvatarPreview, setUserAvatarPreview] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Radiology",
    "Neurology",
    "ENT",
    "Physical Therapy",
    "Dermatology",
    "Oncology"
  ];

  const NavigateTo = useNavigate()
  const handleAvatar = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setUserAvatarPreview(reader.result);
      setUserAvatar(file);
    }
  }
  const HandleNewAdmin = async (e) => {

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname)
      formData.append("lastname", lastname)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("userAvatar", userAvatar)
      formData.append("phone", phone)


      await axios.post(
        "http://localhost:8000/api/v1/user/admin/addnew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          toast.success(res.data.message)
          NavigateTo("/")
        })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <section className="page ">
        <h1>Add New Admin</h1>
        <form onSubmit={HandleNewAdmin}>
          <div className='doctor-add'>
            <div className="first-wrapper">
              <img
                src={
                  userAvatarPreview ? `${userAvatarPreview}` : "/patientHolder.png"
                } alt="User Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div className="form-container-doctor">

              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />


              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="Submit">Register New Admin </button>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddNewAdmin
