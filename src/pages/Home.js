import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../extrafiles/RSM_NEW.jpg"
import pic2 from "../extrafiles/rsm-pic.jpg"
import pic3 from "../extrafiles/pic-2.jpg"
import Carousel from "../components/Carousel";
// import logoo from "../extrafiles/Designer-removebg.png"

function Home() {
  const navigate = useNavigate();
  const admintoken = localStorage.getItem("adminToken")
  useEffect(() => {
    const tokenName = 'adminToken';
    const setupTimeName = tokenName + '_setupTime';
    const oneMinute = 3 * 60 * 60 * 1000; // Time after which the token should expire (in milliseconds)
    const now = new Date().getTime();
    const setupTime = localStorage.getItem(setupTimeName);
  
    if (setupTime) {
      if (now - setupTime > oneMinute) {
        localStorage.removeItem(tokenName); // Remove the token
        localStorage.removeItem(setupTimeName); // Remove the setup time
      }
    }
  }, []);

  const images = [
    logo,pic2,pic3
  ];

  return (
    <div className="layout">
      <div className="flex md:flex-wrap md:flex-row flex-col">
        {/* <div className="justify-center mx-auto pt-4"> */}
        <div className="md:w-1/2 w-full">
          <Carousel images={images} />
        </div>
          {/* <img src={logo} className=" w-full justify-center mx-auto " /> */}
        {/* </div> */}
        <div className="md:w-1/2 md:mt-0 mt-[400px] w-full flex flex-col h-full md:h-screen justify-center items-center">
          <h1 className="md:text-5xl text-3xl uppercase justify-center md:mr-3 font-thin text-gray-500 text-center items-center">Result Management System</h1>
          {/* <h5 className="font-extrabold uppercase text-3xl mt-2 ml-2">Student Result</h5> */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button 
            className="bg-blue-950 text-white px-4 py-2 rounded-full font-bold text-base " 
            onClick={() => { 
              admintoken ? navigate("/employee"):navigate("/login"); 
            }}
            >
              Admin Login
            </button>
            <button 
            className="bg-blue-950 text-white px-4 py-2 rounded-full font-bold text-base"
            onClick={() => { 
              navigate("/students/login"); 
            }}
            >
              Student Login
            </button>
          </div>
          <div className="absolute bottom-0 p-6">
            <h3 className="font-bold">Contact Us : +0123456789</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
