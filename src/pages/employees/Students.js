import { Table } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import Form from "../../components/Form";

function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = React.useState([]);
  const navigate = useNavigate();
  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const deleteStudent = async (rolNo) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/delete-student/${rolNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getStudents();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   getStudents();
  // }, []);

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Student Password",
      dataIndex: "studentpass",
      key: "studentpass",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteStudent(record.rollNo);
            }}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              navigate(`/employee/students/edit/${record.rollNo}`);
            }}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title="Add Students" />
      <h6 className='text-center text-xl pb-3 underline'>Student Details</h6>
      <form>
        <div className="flex justify-center gap-4">
          <Form title="Name" name="stuname" />
          <Form title="Class" name="stuclass" />
          <Form title="Rollno" name="sturollno" />
        </div>
        <div className="flex justify-center gap-4 mt-5">
          <Form title="Gender" name="stugender" />
          <Form title="Email" name="stuemail" />
          <Form title="Phone" name="stuphone" />
        </div>
        <div className="flex justify-center gap-4 mt-5">
          <Form title="Password" name="stupassword" />
        </div>
        <div className="flex items-center justify-center my-4">
          <button className="bg-blue-950 text-white px-4 font-bold">Add Student</button>
        </div>
      </form>
      <Table columns={columns} dataSource={students} />
    </div>
  );
}

export default Students;
