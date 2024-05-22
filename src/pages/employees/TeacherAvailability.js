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

const TeacherAvailability = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [teacherAvaFrom, setTeacherAvaFrom] = useState("");
  const [teacherAvaTo, setTeacherAvaTo] = useState("");
  const [isupdate, setIsUpdate] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const dispatch = useDispatch();

  const onChangeTeacherName = (name, value) => {
    setTeacherName(value);
  };
  const onChangeTeacherAvaFrom = (name, value) => {
    setTeacherAvaFrom(value);
  };
  const onChangeTeacherAvaTo = (name, value) => {
    setTeacherAvaTo(value);
  };


  const addSubject = async (e) => {
    e.preventDefault();
    console.log("1");
    try {
      dispatch(ShowLoading());
      console.log("2");
      const response = await axios.post(
        "/api/subjectes/add-subject",
        {
            teacherName: teacherName,
            teacherAvaFrom: teacherAvaFrom,
            teacherAvaTo: teacherAvaTo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      // console.log("2");
      setTeacherName("");
      setTeacherAvaFrom("");
      setTeacherAvaTo("");
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Ocuring during add New Subject");
      toast.error(error.message);
    } finally {
        setTeacherName("");
        setTeacherAvaFrom("");
        setTeacherAvaTo("");
        setIsUpdate(false);
    }
    // console.log("Submit handler");
    // console.log("sunjectName : " + subjectName);
    // console.log("sunjectCode : " + subjectCode);
  };

  const deleteSubject = async (teacherId) => {
    try {
      const response = await axios.post(
        `/api/subjectes/delete-subject/${teacherId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
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

  const updateSubject = async (teacherId) => {
    try {
      dispatch(ShowLoading());
      console.log("2");
      const response = await axios.post(
        `/api/subjectes/update-subject/${teacherId}`,
        {
            teacherName: teacherName,
            teacherAvaFrom: teacherAvaFrom,
            teacherAvaTo: teacherAvaTo,
        },
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      // console.log("2");;
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Ocuring during add Updating Subject");
      toast.error(error.message);
    } finally {
      setIsUpdate(false);
      setTeacherName("");
    setTeacherAvaFrom("");
    setTeacherAvaTo("");
      setTeacherId("");
    }
  };

//   useEffect(() => {
//     const getallSubjects = async () => {
//       const response = await axios.post("/api/subjectes/get-all-subject");
//       const data = response.data.data;
//       setTeachers(data); // Update state with the entire data array
//     };
//     getallSubjects();
//   }, [teachers]);

  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "Available From",
      dataIndex: "teacherAvaFrom",
      key: "teacherAvaFrom",
    },
    {
        title: "Available To",
        dataIndex: "teacherAvaTo",
        key: "teacherAvaTo",
      },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteSubject(record._id);
            }}
          ></i>
          <i
            onClick={() => {
              setTeacherName(record.teacherName); // Set the subjectName when edit is clicked
              setTeacherAvaFrom(record.teacherAvaFrom); // Set the subjectCode when edit is clicked
              setTeacherAvaTo(record.teacherAvaTo); // Set the subjectCode when edit is clicked
              setIsUpdate(true);
              setTeacherId(record._id);
            }}
            className="ri-pencil-line"
          ></i>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex">
        <SideNavBar />
        <div className="w-full h-full">
          <PageTitle title="Teacher Availability" />
          <h6 className="text-center text-xl pb-3 underline">
            Add Teacher Availability
          </h6>
          <form>
            <div className="flex justify-center gap-4">
              <Form
                value={teacherName}
                onChange={onChangeTeacherName}
                title="Teacher Name"
                name="teachername"
                type="text"
              />
              <Form
                value={teacherAvaFrom}
                onChange={onChangeTeacherAvaFrom}
                title="Teacher Available From"
                name="avafrom"
                type="date"
              />
              <Form
                value={teacherAvaTo}
                onChange={onChangeTeacherAvaTo}
                title="Teacher Available To"
                name="avato"
                type="date"
              />
            </div>

            {isupdate ? (
              <div className="flex items-center justify-center my-3">
                <button
                  onClick={() => {
                    updateSubject(teacherId);
                  }}
                  className="bg-blue-950 text-white px-4 font-bold"
                >
                  Update Teacher Availability
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center my-3">
                <button
                  onClick={addSubject}
                  className="bg-blue-950 text-white px-4 font-bold"
                >
                  Add Teacher Availability
                </button>
              </div>
            )}
          </form>
          <Table columns={columns} dataSource={teachers} />
        </div>
      </div>
    </>
  );
};

export default TeacherAvailability;
