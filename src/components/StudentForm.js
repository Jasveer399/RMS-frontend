import { Col, Form, Row } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";

function StudentForm({ student, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "edit") {
        response = await axios.post(
          `https://rms-backend-1rd9.onrender.com/api/student/update-student/${student.rollNo}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "https://rms-backend-1rd9.onrender.com/api/student/add-student",
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/employee/students");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} initialValues={student}>
        <Row gutter={[5, 10]}>
          <Col span={5}>
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                { required: true, message: "Please enter the First Name" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Roll No"
              name="rollNo"
              rules={[{ required: true, message: "Please enter the Roll No" }]}
            >
              <input type="number" disabled={type === "edit" ? true : false} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter the Email" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Class"
              name="class"
              rules={[{ required: true, message: "Please enter the Class" }]}
            >
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Subject Details"
              name="subjects"
              rules={[{ required: true, message: "Please enter the Subjects" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-2">
          <button className="primary text-white px-5">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default StudentForm;
