import { Table } from "antd";
import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import SideNavBar from "./SideNavBar";
import toast from "react-hot-toast";
import ClassesForm from "../../components/ClassesForm";

const Classes = () => {
  const [classes, setClasses] = React.useState([]);
  
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
        <div className="w-full h-full">
          <PageTitle title="Manage Subjects" />
          <h6 className="text-center text-xl pb-3 underline">Add New Class</h6>
         <ClassesForm/>
          {/* <form onSubmit={add}>
            <div className="flex justify-center gap-4">
              <Form
                onChange={(e) => setclassName(e.target.value)}
                title="Class Name"
                name="classname"
              />
              <Form
                onChange={(e) => setclassCode(e.target.value)}
                title="Class Code"
                name="classcode"
              />
            </div>

            <div className="flex items-center justify-center my-3">
              <button
                type="submit"
                className="bg-blue-950 text-white px-4 font-bold"
              >
                Add Class
              </button>
            </div>
          </form> */}
          <Table columns={columns} dataSource={classes} />
        </div>
      </div>
    </>
  );
};

export default Classes;
