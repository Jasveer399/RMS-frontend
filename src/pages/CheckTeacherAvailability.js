import React, { useEffect, useState } from "react";
import Navbar from "./employees/Navbar";
import { Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import students from "../redux/students";
import { useSelector } from "react-redux";

const CheckTeacherAvailability = () => {
  const [teachers, setTeachers] = useState([]);
  const loginStudent = JSON.parse(localStorage.getItem("loginStudent"));
  useEffect(() => {
    const getAllTeacherAvailable = async () => {
      try {
        const response = await axios.get(
          "/api/teacheravl/get-all-availablesTeacher"
        );
        const data = response.data.data;
        setTeachers(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getAllTeacherAvailable();
  }, []);

  const bookTeacher = async (id) => {
    console.log("loginStudent => ", loginStudent);
    try {
      console.log("Teacher ID => ", id);
      const date = new Date();
      const nowdate = date.toISOString().split("T")[0]; // This will give you the date part in YYYY-MM-DD format
      const response = await axios.post("/api/teacheravl/bookTeacher", {
        id: id,
        bookedBy: loginStudent.name,
        bookedDate: nowdate,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        console.log(response);
        return;
      }
      toast.success(response.data.message);

      // Update the local state to reflect the booking
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher._id === id ? { ...teacher, isBooked: true } : teacher
        )
      );
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

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
      title: "Time From",
      dataIndex: "timeFrom",
      key: "timeFrom",
    },
    {
      title: "Time To",
      dataIndex: "timeTo",
      key: "timeTo",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <button
            onClick={() => bookTeacher(record._id)}
            className="bg-blue-950 rounded-lg h-5 text-white px-2"
            disabled={record.isBooked} // Disable the button if already booked
          >
            {record.isBooked ? "Booked" : "Book"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <h6 className="text-center text-xl pb-2 mt-3 underline">
        Book Appointment
      </h6>
      <div className="container w-[60%] bg-blue-950 flex flex-col p-2 rounded-lg">
        <Table
          dataSource={teachers}
          columns={columns}
          pagination={false}
          rowKey="_id"
        />
      </div>
    </>
  );
};

export default CheckTeacherAvailability;
