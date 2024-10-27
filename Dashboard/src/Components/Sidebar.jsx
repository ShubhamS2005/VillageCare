import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonSharp } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";

import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:8000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    navigateTo('/login')
  };


  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/feedback");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  const gotoRural = () => {
        navigateTo("/rural");
        setShow(!show);
  };

  const gotoService = () => {
    navigateTo("/service");
    setShow(!show);
};

const handleOtp = () => {
  navigateTo("/navigation");
  setShow(!show);
};

  return (
    <>
      <nav
      style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <IoPersonSharp onClick={gotoRural} />
          <FaUserGraduate onClick={gotoService} />
          <AiOutlineUserAdd onClick={gotoAddNewAdmin} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
