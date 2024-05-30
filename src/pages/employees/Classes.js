import { Table } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import toast from "react-hot-toast";
import Form from "../../components/Form";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [classCode, setClassCode] = useState("");
  const [className, setClassName] = useState();
  const [classId, setClassId] = useState("");
  const [isupdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const onChangeClassName = (name, value) => {
    setClassName(value);
  };
  const onChangeClassCode = (name, value) => {
    setClassCode(value);
  };
  const addclasses = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      console.log("one");
      const response = await axios.post(
        "/api/classes/add-class",
        {
          classCode: classCode,
          className: className,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
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
      console.log("Error Ocuring during add New Class");
      toast.error(error.message);
    } finally {
      setClassCode("");
      setClassName("");
    }
  };

  const deleteClass = async (classId) => {
    try {
      const response = await axios.post(
        `/api/classes/delete-class/${classId}`,
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

  const updateClass = async (classID) => {
    try {
      dispatch(ShowLoading());
      console.log("2");
      const response = await axios.post(
        `/api/classes/update-class/${classID}`,
        {
          classCode: classCode,
          className: className,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      // console.log("2");
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Ocuring during add Updateing Class");
      toast.error(error.message);
    } finally {
      setClassCode("");
      setClassName("");
      setClassId("");
      setIsUpdate(false);
    }
  };

  const getallclasses = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/classes/get-all-classes",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const data = response.data.data;
      console.log("Class data", data);
      setClasses(data);
    } catch (error) {
      toast.error(error.message);
    } // Update state with the entire data array
  };
  const columns = [
    {
      title: "Class Code",
      dataIndex: "classCode",
      key: "classCode",
    },
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteClass(record._id);
            }}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setClassName(record.className); // Set the subjectName when edit is clicked
              setClassCode(record.classCode); // Set the subjectCode when edit is clicked
              setIsUpdate(true);
              setClassId(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    // <div>
    //   <PageTitle title="Manage Classes" />
    //   <h6 className="text-center text-xl pb-3 underline">Add New Class</h6>
    //   <ClassesForm />
    //   <Table className="px-20" columns={columns} dataSource={classes} />
    // </div>
    <>
      <div className="flex">
        <SideNavBar />
        <div className="w-full border-l-2 border-blue-950">
          <PageTitle title="Manage Classes" />
          <h6 className="text-center text-xl pb-3 underline">Add New Class</h6>
          {/* <ClassesForm/> */}
          <form>
            <div className="flex justify-center gap-4">
              <Form
                value={className}
                onChange={onChangeClassName}
                title="Class Name"
                name="classname"
                type="text"
              />
              <Form
                value={classCode}
                onChange={onChangeClassCode}
                title="Class Code"
                name="classcode"
                type="text"
              />

              <button
                onClick={getallclasses}
                type="submit"
                className="bg-blue-950 text-white px-4 font-bold"
              >
                Get All Classes
              </button>
            </div>

            {isupdate ? (
              <div className="flex items-center justify-center my-3">
                <button
                  onClick={() => {
                    updateClass(classId);
                  }}
                  className="bg-blue-950 text-white px-4 font-bold"
                >
                  Update Subject
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center my-3">
                <button
                  onClick={addclasses}
                  type="submit"
                  className="bg-blue-950 text-white px-4 font-bold"
                >
                  Add Class
                </button>
              </div>
            )}
          </form>
          <Table columns={columns} dataSource={classes} />
        </div>
      </div>
    </>
  );
};

export default Classes;
