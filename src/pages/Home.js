import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";
import logo from "../extrafiles/RSM_NEW.jpg"
import { RiAdminFill } from "react-icons/ri";
// import logoo from "../extrafiles/Designer-removebg.png"

function Home() {
  const dispatch = useDispatch();
  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const admintoken = localStorage.getItem("adminToken")
  // const getResults = async (values) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axios.post(
  //       "/api/results/get-all-results",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       setResults(response.data.data);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     toast.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (results.length === 0) {
  //     getResults();
  //   }
  // }, []);

  return (
    <div className="layout">
      {/* <div className="header d-flex justify-content-between align-items-center">
        <div className="image-box-overlay">
        <h1 className="text-white">
          <b className="secondary-text">R M </b>
        </h1>
        <div>
          <h2
            className="text-gray-900 bg-transparent border border-gray-800 hover:bg-white-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center text-white me-2 mb-2 cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </h2>
          </div>
        </div>
      </div> */}
      <div className="flex">
        <div className="justify-center mx-auto pt-4">
          <img src={logo} className=" w-full justify-center mx-auto " />
        </div>
        <div className="w-full items-center m-auto">
          <h1 className="text-5xl uppercase justify-center mr-3 font-thin text-gray-500 text-center items-center">Result Management System</h1>
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
        </div>
      </div>

      {/* {results.length > 0 ? (
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <h1 className="text-large my-3">Welcome to Result Management System</h1>
            <h1 className="text-medium my-3">
              Select Your Examination{" "}
            </h1>
            <hr />
          </Col>

          {results.map((result) => {
            return (
              <Col span={8}>
                <div
                  className="card p-2 cursor-pointer primary-border"
                  // onClick={() => {
                  //   navigate(`/result/${result._id}`);
                  // }}
                  onClick={() => {
                      navigate(`/students/login`);
                    }}
                >
                  <h1 className="text-medium">{result.examination}</h1>
                  <hr />
                  <h1 className="text-small">Class: {result.class}</h1>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
          <h1 className="text-medium">No Results Found</h1>
        </div>
      )} */}
    </div>
  );
}

export default Home;
