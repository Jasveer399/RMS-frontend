import { Col, Form, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import toast from "react-hot-toast";

const ClassesForm = () => {
  const [classCode, setclassCode] = useState("");
  const [subjects, setSubjects] = useState({
    subjectCode: "",
    subjectName: "",
  });
  const [classTitle, setclassTitle] = useState();
  const dispatch = useDispatch();
  const addclasses = async () => {
    try {
      dispatch(ShowLoading());
      console.log("one");
      const response = await axios.post("/api/classes/add-class", {
        classCode: classCode,
        classTitle: classTitle,
        subjects: subjects,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Error Ocuring during add New Class");
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center">
      <Form layout="vertical">
       <div className="flex gap-4">
       <Row gutter={[10, 10]}>
          <Form.Item
            label="Class Code"
            name="classCode"
            rules={[{ required: true, message: "Please enter the Class Code" }]}
          >
            <input onChange={(e) => setclassCode(e.target.value)} type="text" className="rounded-2xl w-60" />
          </Form.Item>
        </Row>
        <div className="d-flex flex-grow-1 align-items-center justify-content-space-around"></div>
        <Row gutter={[10, 10]}>
          <Form.Item
            label="Class Title"
            name="classTitle"
            rules={[{ required: true, message: "Please enter the Class Code" }]}
          >
            <input
              onChange={(e) => setclassTitle(e.target.value)}
              type="text"
              className="rounded-2xl w-60"
            />
          </Form.Item>
        </Row>
       </div>
        <div className="d-flex flex-grow-1 align-items-center justify-content-space-around"></div>
       <div className="flex gap-4">
       <Row gutter={[10, 10]}>
          <Form.Item
            label="SubjectName"
            name="subjectName"
            rules={[{ required: true, message: "Please enter the Class Code" }]}
          >
            <input
              onChange={(e) => (subjects.subjectName = e.target.value)}
              type="text"
              className="rounded-2xl w-60"
            />
          </Form.Item>
        </Row>
        <div className="d-flex flex-grow-1 align-items-center justify-content-space-around"></div>
        <Row gutter={[10, 10]}>
          <Form.Item
            label="Subject Code"
            name="subjectCode"
            rules={[{ required: true, message: "Please enter the Class Code" }]}
          >
            <input
              type="text"
              onChange={(e) => (subjects.subjectCode = e.target.value)}
              className="rounded-2xl w-60"
            />
          </Form.Item>
        </Row>
       </div>
        <div className="d-flex mt-2 mb-4">
          <button onClick={addclasses} className="primary text-white px-5 mr-5">
            Add Class/Subject
          </button>
          
        </div>
      </Form>
    </div>
  );
};

export default ClassesForm;
