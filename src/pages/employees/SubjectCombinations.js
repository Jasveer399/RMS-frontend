import React, { useState, useEffect } from "react";
import SideNavBar from "./SideNavBar";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { Table } from "antd";

function SubjectCombinations() {
  const [dataAdd, setDataAdd] = useState(true);
  const [shownData, setShownData] = useState(false);
  const [isValueExist, setIsValueExist] = useState(false);
  const [removeBtn, setRemoveBtn] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjectes, setSubjectes] = useState([]);
  const [classSubject, setClassSubject] = useState([]);
  const [selectCount, setSelectCount] = useState(1);
  const [selectedSubjectsArray, setSelectedSubjectsArray] = useState([
    // Initial state with an empty object
    { subjectName: "", subjectCode: "" },
  ]);
  const [selectedClassObject, setSelectedClassObject] = useState(
    // Initial state with an empty object
    { className: "", classCode: "" }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const getallclasses = async () => {
      const response = await axios.post(
        "https://rms-backend-1rd9.onrender.com/api/classes/get-all-classes",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const data = response.data.data;
      setClasses(data);
    };
    const getallSubjects = async () => {
      const response = await axios.post("https://rms-backend-1rd9.onrender.com/api/subjectes/get-all-subject");
      const data = response.data.data;
      setSubjectes(data);
    };
    getallSubjects();
    getallclasses();
  }, []);

  const handleAddMore = () => {
    if (!isValueExist) {
      toast.error("Select First Any Value");
    } else {
      setSelectCount(selectCount + 1);
      setRemoveBtn(true);
    }
    setIsValueExist(false);
  };
  const removesubject = () => {
    if (selectCount > 1) {
      setSelectCount(selectCount - 1);
    }
  };
  const handleSubjectChange = (index, value) => {
    setIsValueExist(true);
    const updatedArray = [...selectedSubjectsArray];
    const [subjectName, subjectCode] = value.split("|"); // Splitting the value
    updatedArray[index] = {
      subjectName: subjectName.trim(),
      subjectCode: subjectCode.trim(),
    };
    setSelectedSubjectsArray(updatedArray);
  };

  const handleClassChange = (value) => {
    const [className, classCode] = value.split("|");
    // console.log("CLassName:" + className);
    // console.log("ClassCode:" + classCode);
    setSelectedClassObject({
      className: className,
      classCode: classCode,
    });
  };
  //Add Class With Subject
  const addClassesAndSunject = async () => {
    try {
      const validSubjects = selectedSubjectsArray.filter(
        (subject) => subject.subjectName && subject.subjectCode
      );
      //   console.log("Request Payload:", {
      //     classCode: selectedClassObject.classCode,
      //     className: selectedClassObject.className,
      //     subjects: validSubjects,
      //   });
      if (validSubjects.length === 0) {
        toast.error("Please select at least one subject");
        return;
      }
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://rms-backend-1rd9.onrender.com/api/classSubject/add-classSubject",
        {
          classCode: selectedClassObject.classCode,
          className: selectedClassObject.className,
          subjects: validSubjects,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(response.data);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Ocuring during add New Class With Subject");
      toast.error(error.message);
    }
  };
  const deleteClassAndSubjects = async (classandsubjectsId) => {
    try {
      console.log(classandsubjectsId);
      const response = await axios.post(
        `https://rms-backend-1rd9.onrender.com/api/classSubject/delete-class-subjects/${classandsubjectsId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
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

  useEffect(() => {
    const getAllClassAndSubject = async () => {
      try {
        const response = await axios.get(
          "https://rms-backend-1rd9.onrender.com/api/classSubject/get-all-class-subject"
        );
        const data = response.data.data;
        setClassSubject(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getAllClassAndSubject();
  }, [classSubject]);

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
      title: "Subjects Name",
      dataIndex: "subjects",
      key: "subjects",
      render: (subjects) => (
        <>
          {subjects.map((subject) => (
            <div key={subject._id}>{subject.subjectName}</div>
          ))}
        </>
      ),
    },
    {
      title: "Subjects Code",
      dataIndex: "subjects",
      key: "subjects",
      render: (subjects) => (
        <>
          {subjects.map((subject) => (
            <div key={subject._id}>{subject.subjectCode}</div>
          ))}
        </>
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
              deleteClassAndSubjects(record._id);
            }}
          ></i>
          <i className="ri-pencil-line"></i>
        </div>
      ),
    },
  ];

  const showHideHandler = () => {
    setDataAdd(!dataAdd);
    setShownData(!shownData);
  };
  return (
    <>
      <div className="flex">
        <SideNavBar />
        <div className="md:w-full w-[89%] border-l-2 border-blue-950">
          <div>
            <PageTitle title="Subjects Enrollment" />
            <div className="flex items-center w-full">
              <div className="w-[50%] md:pr-10">
                <h6 className=" text-right text-xl md:pb-3 underline">
                  Subject Enrollment
                </h6>
              </div>
              <div className="w-[50%] text-right pr-6">
                <button
                  onClick={showHideHandler}
                  className="bg-blue-950 text-white px-4 font-bold"
                >
                  {dataAdd && `Show Data`}
                  {shownData && `Add Data`}
                </button>
              </div>
            </div>
            {dataAdd && (
              <div className="flex md:flex-row flex-col mt-5 md:mt-0 md:items-start items-center justify-center gap-5 md:max-h-10">
                <div className="flex justify-center">
                  <select
                    className="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52"
                    onChange={(e) => handleClassChange(e.target.value)}
                  >
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
                <div>
                  {Array.from({ length: selectCount }).map((_, index) => (
                    <div key={index} className="flex justify-center mb-3">
                      <select
                        className="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52"
                        onChange={(e) =>
                          handleSubjectChange(index, e.target.value)
                        }
                      >
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
                  ))}
                  <div className="flex items-center justify-center my-4">
                    <button
                      onClick={addClassesAndSunject}
                      className="bg-blue-950 text-white px-4 font-bold"
                    >
                      Add Subjects
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleAddMore}
                    className="bg-blue-950 text-white px-4 font-bold"
                  >
                    Add More...
                  </button>
                  {removeBtn && (
                    <button
                      onClick={removesubject}
                      className="bg-blue-950 text-white px-4 ml-2 font-bold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          {shownData && 
          <div className="overflow-x-auto">
            <Table columns={columns} dataSource={classSubject} />
          </div>
          }
        </div>
      </div>
    </>
  );
}

export default SubjectCombinations;
