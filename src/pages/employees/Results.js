import { Table } from "antd";
import axios from "axios";
import React, { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import Form from "../../components/Form";
import SideNavBar from "./SideNavBar";

function Results() {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjectes, setSubjectes] = useState([]);
  const navigate = useNavigate();
  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/get-all-results",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResults(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  // const deleteResult = async (resultId) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axios.post(
  //       `/api/result/delete-result/${resultId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       getResults();
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    const getallclasses = async () => {
      const response = await axios.post("/api/classes/get-all-classes");
      const data = response.data.data;
      setClasses(data);
    };
    const getallSubjects = async () => {
      const response = await axios.post("/api/subjectes/get-all-subject");
      const data = response.data.data;
      setSubjectes(data);
    };
    getallSubjects();
    getallclasses();
  }, []);
  useEffect(() => {
    getResults();
  }, []);

  const columns = [
    {
      title: "Examination",
      dataIndex: "examination",
      key: "examination",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-pencil-line"
            onClick={() => {
              navigate(`/employee/results/edit/${record._id}`);
            }}
          ></i>
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
            <div class="flex justify-center items-center pt-3">
              <select class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52">
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
            <div class="flex justify-center items-center pt-3">
              <select class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52">
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
            <div class="flex justify-center items-center pt-3">
              <select class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52">
                <option value="" disabled selected>
                  Select Subject
                </option>
                {subjectes.map((subjecteitem, index) => (
                          <option
                            key={index}
                            value={`${subjecteitem.subjectName}|${subjecteitem.subjectCode}`} // Combining name and code
                          >
                            {subjecteitem.subjectName}
                          </option>
                        ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center my-3">
<<<<<<< HEAD
            <button className="bg-blue-950 text-white px-4 font-bold">Confirm</button>
=======
            <button className="bg-blue-950 text-white px-4 font-bold">
              Confirm
            </button>
>>>>>>> 457f589669c8c44dd3b029cf488db77c39a3b84c
          </div>
        </form>
        {/* <button
          className="primary text-white px-3"
          onClick={() => {
            navigate("/employee/results/add");
          }}
        >
          Add Result
        </button> */}

        <Table columns={columns} dataSource={results} />
      </div>
    </div>
  );
}

export default Results;
