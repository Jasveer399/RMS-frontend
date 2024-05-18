import React, { useEffect, useState, useRef } from "react";
import Navbar from "./employees/Navbar";
import Form from "../components/Form";
import axios from "axios";
import toast from "react-hot-toast";
import { Table } from "antd"; // Import Ant Design Table
import { useReactToPrint } from "react-to-print";

function StudentResult() {
  const [allStudents, setAllStudents] = useState([]);
  const [student, setStudent] = useState({});
  const [rollNo, setRollNo] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [result, setResult] = useState([]);
  const [resultTable, setResultTable] = useState(false)

  const printRef = useRef()

  const printHandler = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${student.name}  (${rollNo})`,
  })

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
        setResultTable(true)
      }
      setNotFound(false);
    } else {
      setNotFound(true);
      setResultTable(false)
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
          title="Student ID"
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
          Student Not Found.
        </div>
      )}
      {result.length > 0 && resultTable && (
        <div className="my-5">
          <h2 className="text-center text-2xl font-bold mb-3">Result</h2>
          <div ref={printRef}>
            <div className="container w-[60%] bg-blue-950 flex flex-col p-2 rounded-lg">
              <div className="flex justify-around">
                <div className="">
                  <ShowStudentData title="Name:-" data={student.name} />
                  <ShowStudentData title="Roll No:-" data={student.rollNo} />
                </div>
                <div className="">
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
        </div>
      )}
      {resultTable &&
      <div className="flex items-center justify-center my-3">
        <button className="bg-blue-950 text-white px-4 font-bold mb-5" onClick={printHandler}>
          Print Result
        </button>
      </div>
      }
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
