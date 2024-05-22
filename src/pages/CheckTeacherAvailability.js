import React, { useState } from "react";
import Navbar from "./employees/Navbar";
import { Table } from "antd";

const CheckTeacherAvailability = () => {
  const [teachers, setTeachers] = useState()

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
            <button
              // onClick={(e) => storeAllResult(e, record._id)}
              className="bg-blue-950 rounded-lg h-5 text-white px-2"
            >
              Book
            </button>
          </div>
        ),
      },
  ];

  return (
    <>
      <Navbar/>
      <h6 className="text-center text-xl pb-2 mt-3 underline">
        Book Appointment 
      </h6>
      <div className="container w-[60%] bg-blue-950 flex flex-col p-2 rounded-lg">
        <Table dataSource={teachers} columns={columns} pagination={false} />
      </div>
    </>
  )
}

export default CheckTeacherAvailability
