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

const Subjects = () => {
  const [subjectes, setSubjectes] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [isupdate, setIsUpdate] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const dispatch = useDispatch();
  const onChangeClassName = (name, value) => {
    setSubjectName(value);
  };
  const onChangeClassCode = (name, value) => {
    setSubjectCode(value);
  };

  const addSubject = async (e) => {
    e.preventDefault();
    console.log("1");
    try {
      dispatch(ShowLoading());
      console.log("2");
      const response = await axios.post("/api/subjectes/add-subject", {
        subjectName: subjectName,
        subjectCode: subjectCode,
      });
      // console.log("2");
      setSubjectName("");
      setSubjectCode("");
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
      setSubjectName("");
      setSubjectCode("");
      setIsUpdate(false);
    }
    // console.log("Submit handler");
    // console.log("sunjectName : " + subjectName);
    // console.log("sunjectCode : " + subjectCode);
  };

  const deleteSubject = async (subjectId) => {
    try {
      const response = await axios.post(
        `/api/subjectes/delete-subject/${subjectId}`
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

  const updateSubject = async (subjectID) => {
    try {
      dispatch(ShowLoading());
      console.log("2");
      const response = await axios.post(
        `/api/subjectes/update-subject/${subjectID}`,
        {
          subjectName: subjectName,
          subjectCode: subjectCode,
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
      setSubjectName("");
      setSubjectCode("");
      setSubjectId("");
    }
  };

  useEffect(() => {
    const getallSubjects = async () => {
      const response = await axios.post("/api/subjectes/get-all-subject");
      const data = response.data.data;
      setSubjectes(data); // Update state with the entire data array
    };
    getallSubjects();
  }, [subjectes]);

  const columns = [
    {
      title: "Subject Code",
      dataIndex: "subjectCode",
      key: "subjectCode",
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
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
              setSubjectName(record.subjectName); // Set the subjectName when edit is clicked
              setSubjectCode(record.subjectCode); // Set the subjectCode when edit is clicked
              setIsUpdate(true);
              setSubjectId(record._id);
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
          <PageTitle title="Manage Subjects" />
          <h6 className="text-center text-xl pb-3 underline">
            Add New Subject
          </h6>
          <form>
            <div className="flex justify-center gap-4">
              <Form
                value={subjectName}
                onChange={onChangeClassName}
                title="Subject Name"
                name="subname"
              />
              <Form
                value={subjectCode}
                onChange={onChangeClassCode}
                title="Subject Code"
                name="subcode"
              />
            </div>

            <div className="flex items-center justify-center my-3">
              <button
                onClick={addSubject}
                className="bg-blue-950 text-white px-4 font-bold"
              >
                Add Subject
              </button>
            </div>
            {isupdate && (
              <div className="flex items-center justify-center my-3">
                <button
                  onClick={() => {
                    updateSubject(subjectId);
                  }}
                  className="bg-blue-950 text-white px-4 font-bold"
                >
                  Update Subject
                </button>
              </div>
            )}
          </form>
          <Table columns={columns} dataSource={subjectes} />
        </div>
      </div>
    </>
  );
};

export default Subjects;
