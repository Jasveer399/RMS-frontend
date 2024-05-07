import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import SideNavBar from "./SideNavBar";
import Form from "../../components/Form";

function Results() {
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);
  const [subjectes, setSubjectes] = useState([]);
  const [students, setStudents] = useState([]);
  const [totalmarks, setTotalMarks] = useState("");
  const [obtainmarks, setObtainMarks] = useState({});
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const check = (e) => {
    e.preventDefault();
    if (!subject) {
      toast.error("Select Subject");
      return;
    } else if (!totalmarks) {
      toast.error("Enter Total Marks");
      return;
    }
    console.log("Selected Subject:", subject);
    console.log("Total Marks: ", totalmarks);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesResponse, subjectsResponse, studentsResponse] =
          await Promise.all([
            axios.post("/api/classes/get-all-classes"),
            axios.post("/api/subjectes/get-all-subject"),
            axios.post("/api/student/get-all-students"),
          ]);

        setClasses(classesResponse.data.data);
        setSubjectes(subjectsResponse.data.data);
        setStudents(studentsResponse.data.data);
      } catch (error) {
        toast.error("Unable to fetch data due to server error");
      }
    };

    fetchData();
  }, []);

  const onChangeTotalMarks = (index, value) => {
    setTotalMarks(value);
  };
  useEffect(() => {}, [subject]);
  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Student Semester",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: `Total Mark of ${subject.toUpperCase()}`,
      key: "total-marks",
      render: (text, record) => (
        <div className="d-flex gap-3 h-5">
          <input
            // onChange={(e) =>
            //   setTotalMarks({
            //     ...totalmarks,
            //     [record._id]: e.target.value,
            //   })
            // }
            className="w-40 rounded-md h-5"
            type="number"
            // value={totalmarks[record._id] || ""}
            value={totalmarks}
          />
        </div>
      ),
    },
    {
      title: "Obtain Marks",
      key: "obtain-marks",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <input
            onChange={(e) =>
              setObtainMarks({
                ...obtainmarks,
                [record._id]: e.target.value,
              })
            }
            className="w-40 rounded-md h-5"
            type="number"
            value={obtainmarks[record._id] || ""}
          />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <button
            onClick={check}
            className="bg-blue-950 rounded-lg h-5 text-white px-2"
          >
            Add Result
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      <SideNavBar />
      <div className="w-full h-full">
        <PageTitle title="Results" />
        <h6 className="text-center text-xl pb-3 underline">Add Result</h6>
        <form>
          <div className="flex items-center justify-center gap-4">
            <div className="flex justify-center items-center pt-3">
              <select className="border-2 border-blue-950 px-2 py-[10px] bg-white rounded-3xl w-52">
                <option value="" disabled selected>
                  Select Class
                </option>
                {classes.map((classItem, index) => (
                  <option
                    key={index}
                    value={`${classItem.className}|${classItem.classCode}`}
                  >
                    {classItem.className}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center pt-3">
              <select className="border-2 border-blue-950 px-2 py-[10px] bg-white rounded-3xl w-52">
                <option value="" disabled selected>
                  Select Semester
                </option>
                <option value="">Sem 1st</option>
                <option value="">Sem 2nd</option>
                <option value="">Sem 3rd</option>
                <option value="">Sem 4th</option>
                <option value="">Sem 5th</option>
                <option value="">Sem 6th</option>
                <option value="">Sem 7th</option>
                <option value="">Sem 8th</option>
              </select>
            </div>
            <div className="flex justify-center items-center pt-3">
              <select
                className="border-2 border-blue-950 px-2 py-[10px] bg-white rounded-3xl w-52"
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Subject
                </option>
                {subjectes.map((subjecteitem, index) => (
                  <option key={index} value={`${subjecteitem.subjectName}`}>
                    {subjecteitem.subjectName}
                  </option>
                ))}
              </select>
            </div>
            <Form
              value={totalmarks}
              onChange={onChangeTotalMarks}
              title={`Total Mark`}
              type="number"
            />
          </div>
          <div className="flex items-center justify-center my-3">
            <button
              onClick={check}
              className="bg-blue-950 text-white px-4 font-bold"
            >
              Confirm
            </button>
          </div>
        </form>

        <Table
          columns={columns}
          dataSource={students.map((student) => ({
            ...student,
            key: student._id,
          }))}
        />
      </div>
    </div>
  );
}

export default Results;
