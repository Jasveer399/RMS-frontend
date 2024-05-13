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
  const [classes, setClasses] = useState([]);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [semester, setSemester] = useState("");
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
  const onChangeClassName = (e) => {
    setClassName(e.target.value);
  };
  const onChangeGender = (e) => {
    setGender(e.target.value);
  };
  const onChangePhone = (name, value) => {
    setPhone(value);
  };
  const onChangeSemester = (e) => {
    setSemester(e.target.value);
  };
  const onChangeDob = (name, value) => {
    setDob(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesResponse] = await Promise.all([
          axios.post("/api/classes/get-all-classes"),
        ]);

        setClasses(classesResponse.data.data);
      } catch (error) {
        toast.error("Unable to fetch data due to server error");
      }
    };

    fetchData();
  }, []);

  // const checkHandler = (e) => {
  //   e.preventDefault();
  //   console.log("data here...........");
  //   console.log(dob, name, rollNo, email, className, gender, phone, semester);
  // };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/student/add-student", {
        name: name,
        rollNo: rollNo,
        email: email,
        className: className,
        dob: dob,
        gender: gender,
        phone: phone,
        semester: semester,
      });
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
      setSemester("");
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
          rollNo: rollNo,
          email: email,
          className: className,
          gender: gender,
          phone: phone,
          semester: semester,
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
      setSemester("");
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
      title: "UID",
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
      title: "Student Semester",
      dataIndex: "semester",
      key: "semester",
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
              setRollNo(record.rollNo);
              setEmail(record.email);
              setClassName(record.className);
              setGender(record.gender);
              setPhone(record.phone);
              setSemester(record.semester);
              setDob(record.dob);
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
      try {
        const response = await axios.post("/api/student/get-all-students");
        const data = response.data.data;
        setStudents(data);
      } catch (error) {
        toast.error(error.message);
      }
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

              {/* <Form
                value={className}
                onChange={onChangeClassName}
                title="Class"
                name="stuclass"
                type="text"
              /> */}

              <div className="flex justify-center items-center pt-3">
                <select
                  className="border-2 border-blue-950 px-2 py-[10px] bg-white rounded-3xl w-52"
                  onChange={onChangeClassName}
                  value={className}
                  required
                >
                  <option value="" disabled selected>
                    Select Class
                  </option>
                  {classes.map((classItem, index) => (
                    <option key={index} value={classItem.className}>
                      {classItem.className}
                    </option>
                  ))}
                </select>
              </div>

              <div class="flex justify-center items-center pt-3">
                <select
                  class="border-2 border-blue-950 px-2 py-[9px] bg-white rounded-3xl w-52"
                  onChange={onChangeSemester}
                  value={semester}
                  required
                >
                  <option value="" disabled selected>
                    Select Semester
                  </option>
                  <option value="Sem 1st">Sem 1st</option>
                  <option value="Sem 2st">Sem 2st</option>
                  <option value="Sem 3st">Sem 3st</option>
                  <option value="Sem 4st">Sem 4st</option>
                  <option value="Sem 5st">Sem 5st</option>
                  <option value="Sem 6st">Sem 6st</option>
                  <option value="Sem 7st">Sem 7st</option>
                  <option value="Sem 8st">Sem 8st</option>
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
                title="UID"
                name="sturollno"
                type="number"
              />

              <div class="flex justify-center items-center pt-3">
                <select
                  class="border-2 border-blue-950 px-2 py-[9px] bg-white rounded-3xl w-52"
                  onChange={onChangeGender}
                  value={gender}
                  required
                >
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
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
            {/* <div className="flex items-center justify-center my-4">
              <button
                onClick={checkHandler}
                type="submit"
                className="bg-blue-950 text-white px-4 font-bold"
              >
                checker
              </button>
            </div> */}
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
