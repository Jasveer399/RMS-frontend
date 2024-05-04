import { Table } from "antd";
import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import axios from "axios";
import ClassesForm from "../../components/ClassesForm";
import toast from "react-hot-toast";

const Classes = () => {
  const [classes, setClasses] = React.useState([]);
  const navigate = useNavigate();

  const deleteClass = async (classId) => {
    try {
      const response = await axios.post(`/api/classes/delete-class/${classId}`);
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const columns = [
    {
      title: "Class Code",
      dataIndex: "classCode",
      key: "classCode",
    },
    {
      title: "Class Title",
      dataIndex: "classTitle",
      key: "classTitle",
    },
    {
      title: "Subjects List",
      dataIndex: "subjects",
      key: "subjects",
      render: (subjects) => (
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id}>{subject.subjectName}</li>
          ))}
        </ul>
      ),
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
          <i className="ri-pencil-line"></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const getallclasses = async () => {
      const response = await axios.post("/api/classes/get-all-classes");
      const data = response.data.data;
      setClasses(data); // Update state with the entire data array
    };
    getallclasses();
  }, [classes]);

  const addNewClass = async () => {
    const response = await axios.post("/api/classes/add-class");
  };
  return (
    <div>
      <PageTitle title="Manage Classes" />
      <h6 className="text-center text-xl pb-3 underline">Add New Class</h6>
      <ClassesForm />
      <Table className="px-20" columns={columns} dataSource={classes} />
    </div>
  );
};

export default Classes;
