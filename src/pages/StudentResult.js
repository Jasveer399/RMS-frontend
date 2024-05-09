import React, { useEffect, useState } from "react";
import Navbar from "./employees/Navbar";
import Form from "../components/Form";
import axios from "axios";
import toast from "react-hot-toast";
import { Table } from "antd"; // Import Ant Design Table

function StudentResult() {
  const [allStudents, setAllStudents] = useState([]);
  const [student, setStudent] = useState({});
  const [rollNo, setRollNo] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.post(
          "/api/student/get-all-students"
        );
        setAllStudents(studentsResponse.data.data);
      } catch (error) {
        toast.error("Unable to fetch data due to server error");
      }
    };
    fetchData();
  }, []);

  const showResult = () => {
    setStudent({});
    if (rollNo.length === 0) {
      toast.error("Please enter a valid UID");
      return;
    }
    const found = allStudents.find(
      (onestudent) => onestudent.rollNo === rollNo
    );
    if (found) {
      setStudent(found);
      if (found.results.length === 0) {
        setResult([]);
        toast.error("Your Result is Not Found or Not added yet");
      } else {
        setResult(found.results);
      }
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  useEffect(() => {
    console.log("allStudents", allStudents);
    console.log("student", student);
    console.log("result", result);
  }, [allStudents, student, result]);

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainmarks",
      key: "obtainmarks",
    },
    {
      title: "Total Marks",
      dataIndex: "totalmarks",
      key: "totalmarks",
    },
  ];

  return (
    <>
      <Navbar />
      <h6 className="text-center text-xl pb-2 mt-3 underline">
        Check Result Here
      </h6>
      <div className="flex justify-center">
        <Form
          onChange={(name, value) => setRollNo(value)}
          value={rollNo}
          title="Enter Your UID"
          name="search"
          type="search"
        />
      </div>
      <div className="flex items-center justify-center my-3">
        <button
          onClick={showResult}
          className="bg-blue-950 text-white px-4 font-bold"
        >
          Search you Result
        </button>
      </div>
      {notFound && (
        <div className="text-red-500 text-4xl py-5 justify-center text-center font-bold">
          Student with Roll No./UID {rollNo} not found.
        </div>
      )}
      {result.length > 0 && (
        <div className="my-5">
          <h2 className="text-center text-2xl font-bold mb-3">Result</h2>
          <div className="mx-52 bg-blue-950 flex flex-col p-2 rounded-lg">
            <div className="flex flex-row">
              <div className="items-start">
                <ShowStudentData title="Name:-" data={student.name} />
                <ShowStudentData title="Roll No:-" data={student.rollNo} />
              </div>
              <div className="items-start">
                <ShowStudentData
                  title="Class Name:-"
                  data={student.className}
                />
                <ShowStudentData title="Semester:-" data={student.semester} />
              </div>
            </div>
            <Table dataSource={result} columns={columns} pagination={false} />
          </div>
        </div>
      )}
      <div className="flex items-center justify-center my-3">
        <button className="bg-blue-950 text-white px-4 font-bold">
          Print Result
        </button>
      </div>
    </>
  );
}

function ShowStudentData({ title, data }) {
  return (
    <div className="flex mt-2 ml-10">
      <h2 className="text-center text-white text-2xl font-bold mb-3 mr-2">
        {title}
      </h2>
      <h2 className="text-center text-white text-2xl font-bold mb-3">{data}</h2>
    </div>
  );
}

export default StudentResult;
