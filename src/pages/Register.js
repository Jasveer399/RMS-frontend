import { Form, Input, Radio, Checkbox } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          "/api/classes/get-all-classes",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          console.log(response.data.data);
          setClasses(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error(error.message);
      }
    };

    fetchClasses();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      console.log(values);
      const response = await axios.post("/api/student/add-student", values);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/students/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const handleClassChange = (e) => {
    const classCode = e.target.value;
    const selectedClass = classes.find((c) => c.classCode === classCode);
    if (selectedClass) {
      setSelectedClass(selectedClass);
      setSelectedSubjects(selectedClass.subjects);
    }
  };

  return (
    <div className="login-page-1">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="text-part d-flex flex-column">
            <Form
              layout="vertical w-400 white py-2 px-4"
              onFinish={onFinish}
              initialValues={{ class: selectedClass?.classCode }}
            >
              <h1 className="text-medium">Student Registration</h1>
              <hr />
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rollNo"
                label="Student Roll No."
                rules={[
                  {
                    required: true,
                    message: "Please enter your Roll Number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* <Form.Item
                name="classCode"
                label="Class Name"
                rules={[
                  {
                    required: true,
                    message: "Please select your class",
                  },
                ]}
              >
                <Radio.Group
                  onChange={handleClassChange}
                  value={selectedClass?.classCode}
                >
                  {classes.map((classItem) => (
                    <Radio key={classItem._id} value={classItem.classCode}>
                      {classItem.classTitle}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item> */}
              {/* <Form.Item
                name="subjects"
                label="Subjects"
                rules={[
                  {
                    required: true,
                    message: "Please select the subjects",
                  },
                ]}
              >
                <Checkbox.Group value={selectedSubjects}>
                  {selectedSubjects.map((subject, index) => (
                    <Checkbox key={index} value={subject}>
                      {subject.subjectName}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item> */}
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please provide your email",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
              <button className="primary text-white px-5 my-2 w-100">
                REGISTER
              </button>
              Already Registered ?{" "}
              <Link to="/students/login" className="text-primary">
                Click Here To Login
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
