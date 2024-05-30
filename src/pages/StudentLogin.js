import { Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";
import { SetStudent, ClearStudent } from "../redux/students"; // import the actions

function StudentLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");

  const loginStudent = async () => {
    console.log(rollNo, dob);
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/student/login-student", {
        rollNo: rollNo,
        dob: dob,
      });
      console.log(response.data);
      if (response.data.success) {
        dispatch(HideLoading());
        dispatch(ClearStudent()); // Clear any existing student data
        dispatch(SetStudent(response.data.data)); // Dispatch the action to set the new student data
        localStorage.setItem(
          "loginStudent",
          JSON.stringify(response.data.data)
        );

        toast.success(response.data.message);
        console.log("response:", response.data.data);
        navigate("/students/studentresult");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  return (
    <div className="login-page-1">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="text-part d-flex flex-column ">
            <Form layout="vertical w-400 p-4">
              <h1 className="text-medium">Student Login</h1>
              <hr />
              <Form.Item
                name="rollNo"
                label="Student ID"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Roll No",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Student ID"
                  onChange={(e) => setRollNo(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please select your DOB",
                  },
                ]}
              >
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  onChange={(e) => setDob(e.target.value)}
                />
              </Form.Item>

              <button
                className="text-white px-5 my-2 w-100"
                onClick={loginStudent}
              >
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
