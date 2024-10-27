import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Update = () => {
  const { isAuthenticated, id } = useContext(Context);
  const [sp_role, setSP_Role] = useState("");
  const [docDepartment, setDocDepartment] = useState("");
  const [doc, setDoc] = useState({});
  const NavigateTo = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/user/doctors/api/v1/user/get-service/${id}`,
          { withCredentials: true }
        );
        setDoc(data.service);
      } catch (error) {
        console.log("Some Error occurred", error);
      }
    };
    fetchService();
  }, [id]);

  const HandleUpdatePatient = async (e) => {
    e.preventDefault();
    try {
      const updateData = { SP_Role: sp_role, docDepartment };
      await axios.put(`http://localhost:8000/api/v1/user/update/${id}`, updateData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        NavigateTo('/dashboard');
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-green-700 mb-8">VillageCare</h1>
      <button
        onClick={() => NavigateTo("/dashboard")}
        className="fixed top-5 right-5 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Return to Dashboard
      </button>
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Update Patient Role and Department for
          <span className="text-green-700 ml-2">{doc.firstname} {doc.lastname}</span>
        </h3>
        <p className="text-gray-500 text-center mb-6">
          Here you can update the data
        </p>
        <form onSubmit={HandleUpdatePatient} className="flex flex-col gap-4">
          <input
            type="text"
            value={sp_role}
            placeholder="Role"
            onChange={(e) => setSP_Role(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-green-200"
          />
          <input
            type="text"
            value={docDepartment}
            placeholder="Doctor Department"
            onChange={(e) => setDocDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-green-200"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default Update;
