import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Navbar.css";
const Login = () => {
  const { isAuthenticated, setIsAuthenticated ,setUser} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");


  const closefun=()=>{
     navigateTo("/")
  }
  const navigateTo = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/api/v1/user/login",
          { email, password, confirmPassword, role },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setIsAuthenticated(true);
          toast.success(res.data.message);
          setUser(res.data.user);
          navigateTo("/dashboard");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <>
      <div className="mt-24 mb-24 flex justify-center items-center">
        <div className="flex relative shadow-2xl justify-between items-center h-[75vh] w-[70vw] bg-gray-100 pr-[130px] rounded-xl ">
          <div className="box1 rounded-lg ml-8">
            <img
              width={540}
              src="https://cdn.pixabay.com/photo/2023/01/07/11/30/alpine-7703065_1280.jpg"
              alt="Dev-Bhoomi"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-end items-center">
              <div className="flex flex-col justify-center items-center mr-8 pb-10 gap-4">
                <h1 className="dev tracking-wider font-extrabold text-4xl">
                  VillageCare
                </h1>
                <h2 className="font-bold text-2xl">Log in</h2>
                <p className="font-semibold text-xl">to your account</p>
              </div>
              <div onClick={closefun}className="absolute top-4 right-7 hover:bg-gray-400 rounded-full p-3">
                <img src="/cross_icon.svg" alt="" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-7">
              <form className="flex flex-col gap-7 " onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Rural">Rural Person</option>
                  <option value="ServiceProvider">Service Provider</option>
                  <option value="LocalAdmin">Local Admin</option>


                </select>

                <div className="border-2 bg-stone-900 text-white rounded-md cursor-pointer flex justify-center items-center p-3 text-lg font-bold hover:bg-red-600">
                  <button type="submit">Log in</button>
                </div>
              </form>
              <p className="text-lg">
                Don't have an account?{" "}
                <Link
                  className="text-blue-900 underline text-lg"
                  to={"/register"}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
