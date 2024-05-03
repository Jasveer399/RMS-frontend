import { Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const dummyAdminCredentials = {
        employeeId: "admin",
        password: "admin123",
      };
      if (
        values.employeeId === dummyAdminCredentials.employeeId &&
        values.password === dummyAdminCredentials.password
      ) {
        dispatch(HideLoading());
        toast.success("Login successful!");
        navigate("/employee/");
      } else {
        dispatch(HideLoading());
        toast.error("Invalid credentials. Please try again.");
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
              <h1 className="text-medium">Admin-Login</h1>
              <hr />
              <Form.Item
                name="employeeId"
                label="User Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your User Name",
                  },
                ]}
              >
                <Input type="text" placeholder="User Name" />
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
                <Input type="password" placeholder="Password" />
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
