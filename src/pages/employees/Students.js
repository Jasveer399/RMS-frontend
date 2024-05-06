import { Table } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import SideNavBar from "./SideNavBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { PiPasswordThin } from "react-icons/pi";

const Students = () => {
  // const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [isupdate, setIsUpdate] = useState(false);
  const [studentId, setStudentId] = useState("");
  const dispatch = useDispatch();
  const onChangeName = (name, value) => {
    setName(value);
  };
  const onChangeRollNo = (name, value) => {
    setRollNo(value);
  };
  const onChangeEmail = (name, value) => {
    setEmail(value);
  };
  const onChangeClassName = (name, value) => {
    setClassName(value);
  };
  const onChangeGender = (name, value) => {
    setGender(value);
  };
  const onChangePhone = (name, value) => {
    setPhone(value);
  };
  const onChangePassword = (name, value) => {
    setPassword(value);
  };
  const onChangeDob = (name, value) => {
    setDob(value);
  };

  const checkHandler = (e) => {
    e.preventDefault();
    console.log("dob");
    console.log(dob);
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/student/add-student", {
        name: name,
        rollNo: rollNo,
        email: email,
        className: className,
        gender: gender,
        phone: phone,
        password: password,
      });
      // setName("");
      // setRollNo("");
      // setEmail("");
      // setClassName("");
      // setGender("");
      // setPhone("");
      // setPassword("");
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Ocuring during add New Student");
      toast.error(error.message);
    } finally {
      setName("");
      setRollNo("");
      setEmail("");
      setClassName("");
      setGender("");
      setPhone("");
      setPassword("");
      setIsUpdate(false);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await axios.post(
        `/api/student/delete-student/${studentId}`
      );
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStudent = async (studentId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/update-student/${studentId}`,
        {
          name: name,
          // rollNo: rollNo,
          email: email,
          className: className,
          gender: gender,
          phone: phone,
          password: password,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Occuring during Updating Student");
      toast.error(error.message);
    } finally {
      setName("");
      // setRollNo("");
      setEmail("");
      setClassName("");
      setGender("");
      setPhone("");
      setPassword("");
      setStudentId("");
      setIsUpdate(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Student Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteStudent(record._id);
            }}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setName(record.name);
              // setRollNo(record.rollNo);
              setEmail(record.email);
              setClassName(record.className);
              setGender(record.gender);
              setPhone(record.phone);
              setPassword(record.password);
              setIsUpdate(true);
              setStudentId(record.rollNo);
              // navigate(/employee/students/edit/${record.rollNo});
            }}
          ></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const getallStudents = async () => {
      const response = await axios.post("/api/student/get-all-students");
      const data = response.data.data;
      setStudents(data);
    };
    getallStudents();
  }, [students]);

  return (
    <>
      <div className="flex">
        <SideNavBar />
        <div className="w-full h-full">
          <PageTitle title="Add Students" />
          <h6 className="text-center text-xl pb-3 underline">
            Student Details
          </h6>
          <form>
            <div className="flex justify-center gap-4">
              <Form
                value={name}
                onChange={onChangeName}
                title="Name"
                name="stuname"
                type="text"
              />

              <Form
                value={className}
                onChange={onChangeClassName}
                title="Class"
                name="stuclass"
                type="text"
              />

              <div class="flex justify-center items-center pt-3">
                <select class="border-2 border-blue-950 px-2 py-[9px] bg-white rounded-3xl w-52">
                  <option value="" disabled selected>
                    Select Semester
                  </option>
                  <option value="">Sem 1st</option>
                  <option value="">Sem 2nd</option>
                  <option value="">Sem 3rd</option>
                  <option value="">Sem 4th</option>
                  <option value="">Sem 5th</option>
                  <option value="">Sem 6th</option>
                  <option value="">Sem 7th</option>
                  <option value="">Sem 8th</option>
                </select>
              </div>

              {/* <Form
                value={rollNo}
                onChange={onChangeRollNo}
                title="Rollno"
                name="sturollno"
                type="number"
              /> */}
            </div>

            <div className="flex justify-center gap-4 mt-5">
              <Form
                value={rollNo}
                onChange={onChangeRollNo}
                title="Rollno"
                name="sturollno"
                type="number"
              />

              <div class="flex justify-center items-center pt-3">
                <select class="border-2 border-blue-950 px-2 py-[9px] bg-white rounded-3xl w-52">
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option value="">Male</option>
                  <option value="">Female</option>
                  <option value="">Others</option>
                </select>
              </div>

              {/* <Form
                value={gender}
                onChange={onChangeGender}
                title="Gender"
                name="stugender"
              /> */}

              {/* New DOB FIELD ..... the function is defined check the value is passing or not */}
              <Form
                value={dob}
                onChange={onChangeDob}
                title="Date of Birth"
                name="studob"
                type="date"
              />
            </div>

            <div className="flex justify-center gap-4 mt-5">
              <Form
                title="Email"
                value={email}
                onChange={onChangeEmail}
                name="stuemail"
                type="email"
              />

              <Form
                value={phone}
                onChange={onChangePhone}
                title="Phone"
                name="stuphone"
                type="number"
              />

              {/* <Form
                value={password}
                onChange={onChangePassword}
                title="Password"
                name="stupassword"
              /> */}
            </div>

            <div className="flex items-center justify-center my-4">
              <button
                onClick={addStudent}
                type="submit"
                className="bg-blue-950 text-white px-4 font-bold"
              >
                Add Student
              </button>
            </div>
            <div className="flex items-center justify-center my-4">
              <button
                onClick={checkHandler}
                type="submit"
                className="bg-blue-950 text-white px-4 font-bold"
              >
                checker
              </button>
            </div>
            {isupdate && (
              <div className="flex items-center justify-center my-3">
                <button
                  onClick={() => {
                    updateStudent(studentId);
                  }}
                  className="bg-blue-950 text-white px-4 font-bold"
                >
                  Update Student
                </button>
              </div>
            )}
          </form>
          <Table columns={columns} dataSource={students} />
        </div>
      </div>
    </>
  );
};

export default Students;
