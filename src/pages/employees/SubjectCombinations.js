import React, { useState, useEffect } from "react";
import SideNavBar from "./SideNavBar";
import PageTitle from "../../components/PageTitle";
import axios from "axios";

function SubjectCombinations() {
  const [classes, setClasses] = useState([]);
  const [subjectes, setSubjectes] = useState([]);
  useEffect(() => {
    const getallclasses = async () => {
      const response = await axios.post("/api/classes/get-all-classes");
      const data = response.data.data;
      setClasses(data); // Update state with the entire data array
    };
    const getallSubjects = async () => {
      const response = await axios.post("/api/subjectes/get-all-subject");
      const data = response.data.data;
      setSubjectes(data); // Update state with the entire data array
    };
    getallSubjects();
    getallclasses();
  }, []);
  console.log(classes);
  return (
    <>
      <div className="flex">
        <SideNavBar />
        <div className=" w-full">
          <PageTitle title="Subjects Combination" />
          <h6 className="text-center text-xl pb-3 underline">
            Subject Combinations
          </h6>
          <div className="flex justify-center gap-5">
            <div class="flex justify-center">
              <select class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52">
                <option value="" disabled selected>
                  Select Class
                </option>
                {classes.map((classItem, index) => (
                  <option key={index} value={classItem._id}>
                    {classItem.className}
                  </option>
                ))}
              </select>
            </div>

            <div class="flex justify-center">
              <select class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52">
                <option value="" disabled selected>
                  Select Subject
                </option>
                {subjectes.map((subjecteitem, index) => (
                  <option key={index} value={subjecteitem._id}>
                    {subjecteitem.subjectName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button className="bg-blue-950 text-white px-4 font-bold">
                Add More...
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center my-4">
            <button className="bg-blue-950 text-white px-4 font-bold">
              Add Subjects
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectCombinations;
