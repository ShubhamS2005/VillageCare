import React, { useContext, useState, useEffect } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import annyang from "annyang"; 

const Signup = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [role, setRole] = useState("");
  const [userAvatarPreview, setUserAvatarPreview] = useState("");
  const [lastSpokenText, setLastSpokenText] = useState("");

  useEffect(() => {
        console.log(lastSpokenText)
        if (annyang) {
          const commands = {
            'mera naam *name hai': (name) => {
              setFirstName(name);
              setLastSpokenText(`First name set to: ${name}`);
            },
            'mera surname *name hai': (name) => {
              setLastName(name);
              setLastSpokenText(`Last name set to: ${name}`);
            },
            'mera email *email hai': (email) => {
              setEmail(email);
              setLastSpokenText(`Email set to: ${email}`);
            },
            'mera mobile number *phone hai': (phone) => {
              setPhone(phone);
              setLastSpokenText(`Phone set to: ${phone}`);
            },
            'mera password *password hai': (password) => {
              setPassword(password);
              setLastSpokenText(`Password set to: ${password}`);
            },
            
            'stop listening': () => annyang.abort()
          };
    
          annyang.addCommands(commands);
          annyang.start({ autoRestart: true, continuous: true });
    
          return () => {
            annyang.abort();
          };
        }
      }, []);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserAvatarPreview(reader.result);
      setUserAvatar(file);
    };
  };

  const registerhandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("userAvatar", userAvatar);
      formData.append("role", role);

      await axios
        .post("http://localhost:8000/api/v1/user/register", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          navigateTo("/");
        });
    } catch (error) {
      toast.error(error.response?.data.message || "Registration failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const closefun = () => {
    navigateTo("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-8 transition duration-300 transform hover:scale-105">
        <div className="relative text-right">
          <button onClick={closefun} className="absolute top-0 right-0 p-2">
            <img src="/cross_icon.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          VillageCare
        </h1>
        <h2 className="text-xl font-semibold text-center text-gray-600">
          Sign up
        </h2>

        <form onSubmit={registerhandler} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Role</option>
              <option value="Rural">Rural Person</option>
              <option value="ServiceProvider">Service Provider</option>
              <option value="LocalAdmin">Local Admin</option>
            </select>
          </div>

          <div className="flex flex-col items-center mt-4">
            <img
              src={userAvatarPreview || "https://via.placeholder.com/90"}
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <input
              type="file"
              onChange={handleAvatar}
              className="text-sm text-gray-500"
            />
          </div>

          <div className="flex items-center mt-4">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
              Accept{" "}
              <a href="/terms" className="text-blue-600 underline">
                terms & conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-3 text-white bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already registered?{" "}
          <a href="/Login" className="text-blue-600 underline">
            Log in
          </a>
        </p>
        {lastSpokenText && (
          <div className="mt-4 text-center text-blue-500 text-lg">
            {lastSpokenText}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;


