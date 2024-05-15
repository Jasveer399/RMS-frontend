import { Form, Input } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState(""); // Changed variable name to setAdminName
  const [password, setPassword] = useState("");
  const loginadmin = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/admin/login", {
        name: adminName,
        password: password,
      });
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        dispatch(HideLoading());
        toast.success(response.data.message);
        navigate("/employee");
      } else {
        dispatch(HideLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Ocuring during add Login Admin");
      toast.error(error.message);
    }
  };
  return (
    <div className="login-page-1">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="text-part d-flex flex-column ">
            <Form layout="vertical w-400 p-4" onFinish={loginadmin}>
              <h1 className="text-medium">Admin-Login</h1>
              <hr />
              <Form.Item
                name="adminName" // Fixed typo here
                label="User Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your User Name",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="User Name"
                  onChange={(e) => setAdminName(e.target.value)} // Set adminName state
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} // Set password state
                />
              </Form.Item>

              <button type="submit" className=" text-white px-5 my-2 w-100">
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
