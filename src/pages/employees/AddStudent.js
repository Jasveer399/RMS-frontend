import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import StudentForm from "../../components/StudentForm";

function AddStudent() {
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Add Student" />
      <div className="d-flex flex-grow-1 align-items-center justify-content-left p-4">
        <StudentForm />
      </div>
    </div>
  );
}

export default AddStudent;
