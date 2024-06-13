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
import ConfirmDialog from "../../components/confirmDialog";

function Results() {
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);
  const [subjectes, setSubjectes] = useState([]);
  const [students, setStudents] = useState([]);
  const [totalmarks, setTotalMarks] = useState("");
  const [obtainmarks, setObtainMarks] = useState({});
  const [subject, setSubject] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [selectdclass, setSelectdCLass] = useState("");
  const [selectdSem, setSelectdSem] = useState("");
  const [selectdStudent, setSelectdStudent] = useState([]);
  const [open, setOpen] = useState(false);
  // const [confirmAdd, setConfirmAdd] = useState(false);

  //   const addResult = (e, id) => {
  //     e.preventDefault();

  //     // Check if subject and total marks are selected
  //     if (!subject) {
  //         toast.error("Select Subject");
  //         return;
  //     } else if (!totalmarks) {
  //         toast.error("Enter Total Marks");
  //         return;
  //     }

  //     // Check if obtain marks are entered for the selected student
  //     if (!obtainmarks[id]) {
  //         toast.error("Enter Obtain Marks");
  //         return;
  //     }

  //     // Create a new result object
  //     const newResult = {
  //         student_id: id,
  //         subject: subject,
  //         totalmarks: totalmarks,
  //         obtainmarks: obtainmarks[id],
  //     };
  //     console.log("New Result: ", newResult);

  //     // Check if the result already exists for this student ID
  //     const existingResultIndex = results.findIndex(result => result.student_id === id);
  //     console.log("existingResultIndex= ", existingResultIndex);

  //     if (existingResultIndex !== -1 && results[existingResultIndex].student_id === id) {
  //         toast.error("Result of this Student is Already Present");
  //         return;
  //     }

  //     // If there are no existing results, set results to an array containing only the new result
  //     if (results.length === 0) {
  //         setResults([newResult]);
  //     } else {
  //         // Otherwise, concatenate the new result with the existing results
  //         setResults(prevResults => [...prevResults, newResult]);
  //     }

  //     // Clear obtain marks for the selected student
  //     setObtainMarks({ ...obtainmarks, [id]: "" });

  //     // Clear total marks after adding the result
  //     console.log(results); // or setTotalMarks(null)
  // };

  const storeAllResult = async (e, id, name) => {
    e.preventDefault();
    // Check if subject and total marks are selected
    if (!subject) {
      toast.error("Select Subject");
      return;
    } else if (!totalmarks) {
      toast.error("Enter Total Marks");
      return;
    }

    // Check if obtain marks are entered for the selected student
    if (!obtainmarks[id]) {
      toast.error("Enter Obtain Marks");
      return;
    }
    if (Number(obtainmarks[id]) > Number(totalmarks)) {
      toast.error(`Obtain Marks Is More Than Total Marks ${totalmarks}`);
      return;
    }

    // Check if the result already exists for this student ID
    const existingResultIndex = results.findIndex(
      (result) => result.student_id === id && result.subject === subject
    );

    if (existingResultIndex !== -1) {
      toast.error(
        `Result of ${name} for ${subject} subject is Already Present`
      );

      return;
    }

    // Create a new result object
    const newResult = {
      student_id: id,
      subject: subject,
      totalmarks: totalmarks,
      obtainmarks: obtainmarks[id],
    };

    // Add the new result to results array
    setResults((prevResults) => [...prevResults, newResult]);

    // Clear obtain marks for the selected student
    // setObtainMarks({ ...obtainmarks, [id]: "" });
    toast.success(`Result is added for ${name}`);
    console.log(results);
  };

  const updatestoredResult = async (e, id) => {
    e.preventDefault();
    // Check if subject and total marks are selected
    if (!subject) {
      toast.error("Select Subject");
      return;
    } else if (!totalmarks) {
      toast.error("Enter Total Marks");
      return;
    } else if (!obtainmarks[id]) {
      toast.error("Enter Update Obtain Marks");
      return;
    }

    const existingResultIndex = results.findIndex(
      (result) => result.student_id === id && result.subject === subject
    );

    if (existingResultIndex === -1) {
      toast.error("Result is Not Present. First Lock Result");
      return;
    } else if (Number(obtainmarks[id]) > Number(totalmarks)) {
      toast.error(`Obtain Marks Is More Than Total Marks ${totalmarks}`);
      console.log("Obtain Marks =>", obtainmarks[id]);
      return;
    } else {
      // Update the existing result in the state
      const updatedResults = results.map((result, index) =>
        index === existingResultIndex
          ? { ...result, obtainmarks: obtainmarks[id] }
          : result
      );
      setResults(updatedResults);
      toast.success("Result updated successfully");
    }
  };

  const addResultsInDB = async (e) => {
    e.preventDefault();
    // const confirmAdd = window.confirm(
    //   "Are you sure you want to add these results?"
    // );
    // if (!confirmAdd) {
    //   toast.error("Add operation canceled");
    //   return;
    // }
    setOpen(false)
    try {
      if (selectdStudent.length <= results.length) {
        const response = await axios.post("https://rms-backend-1rd9.onrender.com/api/student/add-results", {
          results,
        });
        if (response.data.success) {
          toast.success("Results Add SuccessFully");
          setResults([]);
          setObtainMarks({});
        }
      } else {
        toast.error("Add All Student Result");
      }
    } catch (error) {
      toast.error("Unable To store All Result");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesResponse, subjectsResponse, studentsResponse] =
          await Promise.all([
            axios.post(
              "https://rms-backend-1rd9.onrender.com/api/classes/get-all-classes",
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
              }
            ),
            axios.post(
              "https://rms-backend-1rd9.onrender.com/api/subjectes/get-all-subject",
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
              }
            ),
            axios.post(
              "https://rms-backend-1rd9.onrender.com/api/student/get-all-students",
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
              }
            ),
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
  useEffect(() => {
    console.log("results =>", results);
  }, [results]);

  const getSelectedStudents = (e) => {
    e.preventDefault();
    if (!selectdSem && !selectdclass) {
      toast.error("Select Class and Semester Both");
      return;
    }
    const selectedStudents = students.filter(
      (student) =>
        student.className === selectdclass && student.semester === selectdSem
    );
    setSelectdStudent(selectedStudents);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Student ID",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Student Semester",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "class",
    },
    {
      title: `Total Mark of ${subject.toUpperCase()}`,
      key: "total-marks",
      render: (text, record) => (
        <div className="d-flex gap-3 h-5">
          <h1>{totalmarks}</h1>
        </div>
      ),
    },
    {
      title: "Obtain Marks",
      key: "obtain-marks",
      render: (text, record) => (
        <div className="d-flex gap-3 h-5">
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
      title: "Lock Result",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <button
            onClick={(e) => storeAllResult(e, record._id, record.name)}
            className="bg-blue-950 rounded-lg h-5 text-white px-2 hover:bg-blue-900"
          >
            Lock Result
          </button>
        </div>
      ),
    },
    {
      title: "Update Result",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <button
            onClick={(e) => updatestoredResult(e, record._id)}
            className="bg-blue-950 rounded-lg h-5 text-white px-2 hover:bg-blue-900"
          >
            Update Result
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
              <select
                className="border-2 border-blue-950 px-2 py-[10px] bg-white rounded-3xl w-52"
                onChange={(e) => setSelectdCLass(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Class
                </option>
                {classes.map((classItem, index) => (
                  <option key={index} value={`${classItem.className}`}>
                    {classItem.className}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center pt-3">
              <select
                className="border-2 border-blue-950 px-2 py-[10px] bg-white rounded-3xl w-52"
                onChange={(e) => setSelectdSem(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Semester
                </option>
                <option value="Sem 1st">Sem 1st</option>
                <option value="Sem 2nd">Sem 2nd</option>
                <option value="Sem 3rd">Sem 3rd</option>
                <option value="Sem 4th">Sem 4th</option>
                <option value="Sem 5th">Sem 5th</option>
                <option value="Sem 6th">Sem 6th</option>
                <option value="Sem 7th">Sem 7th</option>
                <option value="Sem 8th">Sem 8th</option>
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
              onClick={getSelectedStudents}
              className="bg-blue-950 mr-52 text-white px-4 font-bold hover:bg-blue-900"
            >
              Get Students
            </button>
          </div>
        </form>

        <Table
          columns={columns}
          dataSource={selectdStudent.map((student) => ({
            ...student,
            key: student._id,
          }))}
        />

        <div className="flex items-center justify-center my-3">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-950 text-white px-4 font-bold hover:bg-blue-900"
          >
            Add All Results
          </button>
          <ConfirmDialog open={open} onClose={() => setOpen(false)}>
            <div className="text-center w-56">
              <div className="mx-auto my-4 w-48">
                <h3 className="text-lg font-black text-gray-800">
                  Confirm to Add Results
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to Add Resuts?
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="btn btn-success w-full"
                  onClick={addResultsInDB}
                >
                  Add Results
                </button>
                <button
                  className="btn btn-danger w-full"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </ConfirmDialog>
        </div>
      </div>
    </div>
  );
}

export default Results;
