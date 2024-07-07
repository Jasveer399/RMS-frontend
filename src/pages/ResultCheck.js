import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alerts";
function ResultCheck() {
  const navigate = useNavigate()
  const [rollNo, setRollNo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [studentResult, setStudentResult] = React.useState(null);
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const dispatch = useDispatch();
  const getResult = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `https://rms-backend-1rd9.onrender.com/api/results/get-result/${params.resultId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);
  const studentLogin = async (rollNo, password) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `https://rms-backend-1rd9.onrender.com/api/students/login`,
        { rollNo, password }, // Pass rollNo and password to the backend
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        localStorage.setItem("token",response.data.data);
        toast.success(response.data.message);
        navigate("/students/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  
 
  
  const getPercenatge = () => {
    let totalMarks = 0;
    let obtainedMarks = 0;
    result.subjects.forEach((subject) => {
      totalMarks += Number(subject.totalMarks);
    });
    console.log(totalMarks);
    Object.keys(studentResult.obtainedMarks).forEach((key) => {
      obtainedMarks += Number(studentResult.obtainedMarks[key]);
    });
    console.log(obtainedMarks);
    return (obtainedMarks / totalMarks) * 100;
  };
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
      <div className="image-box-overlay">
        <h1 className="text-white">
          <b className="secondary-text">R M S</b>
        </h1>
        <div>
        <h6 className="text-white">New Student?</h6>
        <h2
            className="text-gray-900 bg-transparent border border-gray-800 hover:bg-white-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center text-white me-2 mb-2 cursor-pointer"
            onClick={() => {
              navigate("/register");
            }}
          >
             REGISTER
          </h2>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-3 p-3 card">
          <h1 className="text-small">Examination: {result.examination}</h1>
          <h1 className="text-small">Class: {result.class}</h1>
        </div>
      )}
      <hr />
      <div className="d-flex gap-3 p-3 card flex-col align-items-left mx-auto">
        <label for='rollno'>User Name</label>
        <input
          type="number"
          name="rollno"
          placeholder="Roll No"
          className="w-300"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        
        <label for='studentpass'>Password</label>
        <input
          type="password"
          name="studentpass"
          placeholder="*****"
          className="w-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button
          className="w-300 primary text-white"
          onClick={() => {
            studentLogin(rollNo, password);
          }}
        >
          Login
        </button>
      </div>

      {studentResult && (
        <div className="card p-3 overflow-x-auto">
          <div>
            <h1 className="text-medium ">
              <b>
                Name: {studentResult.firstName} {studentResult.lastName}
              </b>
            </h1>
          </div>
          <hr />
          <table className="table table-bordered w-50">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject, index) => (
                <tr>
                  <td>{subject.name}</td>
                  <td>{subject.totalMarks}</td>
                  <td>{studentResult.obtainedMarks[subject?.name] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              backgroundColor: "#002B5B",
              width: "max-content",
            }}
            className="p-3 w-50"
          >
            <h1 className="text-white text-center text-medium">
              Percentage : {getPercenatge().toFixed(2)} % , Verdict :{" "}
              {studentResult?.verdict?.toUpperCase()}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultCheck;
