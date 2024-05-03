import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts.js";
import { SetEmployee } from "../redux/employees.js";
import { SetStudent } from "../redux/students.js";
import DefaultLayout from "../components/DefaultLayout.js";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ userType, children }) {
  const navigate = useNavigate();
  const [readyToRender, setReadyToRender] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      dispatch(HideLoading());
      let endpoint = "";
      let setUserDataAction = null;
      
      // Determine endpoint and action based on user type
      if (userType === "employee") {
        endpoint = "/api/employee/get-employee-by-id";
        setUserDataAction = SetEmployee;
      } else if (userType === "student") {
        endpoint = "/api/student/get-student-by-id";
        setUserDataAction = SetStudent;
      }
      
      const response = await axios.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        dispatch(setUserDataAction(response.data.data));
        setReadyToRender(true);
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(HideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return readyToRender ? <DefaultLayout>{children}</DefaultLayout> : null;
}

export default ProtectedRoute;
