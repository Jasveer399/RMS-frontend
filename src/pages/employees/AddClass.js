import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import ClassesForm from "../../components/ClassesForm";


function AddClass() {
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Add Class" />
      <div className='d-flex flex-grow-1 align-items-center justify-content-left p-4'>
      <ClassesForm/>
      </div>
    </div>
  );
}

export default AddClass;