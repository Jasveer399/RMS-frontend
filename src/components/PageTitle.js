import React from "react";
import { useNavigate } from "react-router-dom";

function PageTitle({ title }) {
  const navigate = useNavigate();
  return (
    <div className="px-2 d-flex gap-5 align-items-center mb-2 bg-blue-950 mb-4">
      <i
        className="ri-arrow-left-line text-white"
        onClick={() => {
          navigate(-1);
        }}
      ></i>
      <h1 className="text-4xl py-3 font-bold text-white uppercase">{title}</h1>
      <hr />
    </div>
  );
}

export default PageTitle;
