import { Form, Input } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";

function StudentLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/student/studentlogin", values);
      console.log(response.data);
      if (response.data.success) {
        dispatch(HideLoading());
        // localStorage.setItem("token", response.data.data);
        toast.success(response.data.message);
        console.log(response.data);
        navigate("/students/home");
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
            <Form layout="vertical w-400 p-4" onFinish={onFinish}>
              <h1 className="text-medium">Student Login</h1>
              <hr />
              <Form.Item
                name="rollNo"
<<<<<<< HEAD
                label="Student ID"
=======
                label="UID"
>>>>>>> 560084e714ba173960b8fa5b891beca828138528
                rules={[
                  {
                    required: true,
                    message: "Please enter your Roll No",
                  },
                ]}
              >
                <Input type="number" placeholder="UID" />
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
                <Input type="date" placeholder="Date of Birth" />
              </Form.Item>

              <button
                className=" text-white px-5 my-2 w-100"
                onClick={() => {
                  navigate("/students/studentresult");
                }}
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
