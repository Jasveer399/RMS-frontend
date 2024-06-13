import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Form from "../../components/Form";
import SideNavBar from "./SideNavBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldpassword] = useState(""); // Changed variable name to setAdminName
  const [newpassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onchangeOldPassword = (name, value) => {
    setOldpassword(value);
  };
  const onchangeNewPassword = (name, value) => {
    setNewPassword(value);
  };
  const changePassword = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://rms-backend-1rd9.onrender.com/api/admin/change-password",
        {
          oldpassword: oldPassword,
          newpassword: newpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.data.success) {
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
    <>
      <div className="flex">
        <SideNavBar />
        <div className="w-full border-l-2 border-blue-950">
          <PageTitle title="Change Password" />
          <h6 className="text-center text-xl pb-3 underline">
            Change Password
          </h6>

          <form>
            <div className="flex justify-center gap-4 mt-2">
              <Form
                onChange={onchangeOldPassword}
                title="Enter Old Password"
                name="oldpass"
              />
              <Form
                onChange={onchangeNewPassword}
                title="Enter New Password"
                name="newpass"
              />
            </div>

            <div className="flex items-center justify-center my-3">
              <button
                onClick={changePassword}
                className="bg-blue-950 text-white px-4 font-bold"
              >
                Change Password
              </button>
            </div>
          </form>

          <h6 className="text-center text-xl pb-3">OR</h6>
          <h6 className="text-center text-xl pb-3 underline">Reset Password</h6>

          <form>
            <div className="flex justify-center gap-4 mt-2">
              <Form title="Enter your mail" name="mailpass" />
            </div>

            <div className="flex items-center justify-center my-3">
              <button className="bg-blue-950 text-white px-4 font-bold">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
