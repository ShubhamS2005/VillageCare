import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctor_firstname, setDoctorFirstName] = useState("");
  const [doctor_lastname, setDoctorLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [hasvisited, setHasVisited] = useState("");
  const navigateTo = useNavigate();
  const departmentsArray = [
    "Pediatrics", "Orthopedics", "Cardiology", "Radiology", 
    "Neurology", "ENT", "Physical Therapy", "Dermatology", "Oncology"
  ];
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get("http://localhost:8000/api/v1/user/doctors", { withCredentials: true });
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasvisitedBool = Boolean(hasvisited);
      await axios.post("http://localhost:8000/api/v1/appointment/post",
        { firstname, lastname, email, gender, dob, phone, appointmentDate, doctor_firstname, doctor_lastname, Address, department, hasVisited: hasvisitedBool }, 
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      ).then((res) => {
        toast.success(res.data.message);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-blue-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 transition transform hover:scale-105">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-4">Book Your Appointment</h3>
        <p className="text-center text-gray-600 mb-8">Fill out the form below to schedule your appointment with us</p>
        
        <form onSubmit={handleAppointment} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)} 
              className="input-style" />
            <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} 
              className="input-style" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
              className="input-style" />
            <input type="tel" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} 
              className="input-style" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-style">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} 
              className="input-style" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="date" placeholder="Appointment Date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} 
              className="input-style" />
            <select value={department} onChange={(e) => { setDepartment(e.target.value); setDoctorFirstName(""); setDoctorLastName(""); }} 
              className="input-style">
              <option value="">Select Department</option>
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>{depart}</option>
              ))}
            </select>
          </div>

          <select value={`${doctor_firstname} ${doctor_lastname}`} onChange={(e) => { const [firstName, lastName] = e.target.value.split(" "); setDoctorFirstName(firstName); setDoctorLastName(lastName); }}
            className="input-style" disabled={!department}>
            <option value="">Select Doctor</option>
            {doctors.filter((doctor) => doctor.doctorDepartment === department).map((doctor, index) => (
              <option value={`${doctor.firstname} ${doctor.lastname}`} key={index}>{doctor.firstname} {doctor.lastname}</option>
            ))}
          </select>

          <textarea placeholder="Address" rows="4" value={Address} onChange={(e) => setAddress(e.target.value)} className="input-style"></textarea>

          <div className="flex items-center space-x-2">
            <label htmlFor="hasvisited" className="text-gray-600">Have you visited before?</label>
            <input type="checkbox" id="hasvisited" checked={hasvisited} onChange={(e) => setHasVisited(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600"/>
          </div>

          <button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 transform hover:scale-105">Get Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;
