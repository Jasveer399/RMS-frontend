import { Button } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/employees/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./styles/theme.css";
import "./styles/layout.css";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import EmployeeHome from "./pages/employees/EmployeeHome";
import Students from "./pages/employees/Students";
import AddStudent from "./pages/employees/AddStudent";
import Classes from "./pages/employees/Classes";
import EditStudent from "./pages/employees/EditStudent";
import PublicRoute from "./components/PublicRoute";
import Results from "./pages/employees/Results";
import AddResult from "./pages/employees/AddResult";
import EditResult from "./pages/employees/EditResult";
import ResultCheck from "./pages/ResultCheck";
import AddClass from "./pages/employees/AddClass";
import Examination from "./pages/employees/Examination";
import StudentLogin from "./pages/StudentLogin";
import StudentHome from "./pages/StudentHome";
import Subjects from "./pages/employees/Subjects";
import ChangePassword from "./pages/employees/ChangePassword";
import ProtectedRoute from "./utils/ProtectedRoute";
import SubjectCombinations from "./pages/employees/SubjectCombinations";
import StudentResult from "./pages/StudentResult";

function App() {
  const { loading } = useSelector((state) => state.alert);

  return (
    <div className="App">
      {loading ? <Spinner /> : null}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result/:resultId" element={<ResultCheck />} />
          <Route
            path="/students/login"
            element={
              <PublicRoute>
                <StudentLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/students/home"
            element={
              <PublicRoute>
                <StudentHome />
              </PublicRoute>
            }
          />
          <Route
            path="/students/studentresult"
            element={
              <PublicRoute>
                <StudentResult />
              </PublicRoute>
            }
          />
          <Route
            path="/students/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          /////////////////////ProtectedRoute////////////////////
          <Route element={<ProtectedRoute />}>
            <Route path="/employee" element={<EmployeeHome />} />
            <Route path="/employee/students" element={<Students />} />
            <Route path="/employee/students/add" element={<AddStudent />} />
            <Route path="/employee/classes" element={<Classes />} />
            <Route path="/employee/classes/add" element={<AddClass />} />
            <Route path="/employee/subjects" element={<Subjects />} />
            <Route
              path="/employee/changepassword"
              element={<ChangePassword />}
            />
            <Route
              path="/employee/subjectscombination"
              element={<SubjectCombinations />}
            />
            <Route
              path="/employee/students/edit/:rollNo"
              element={<EditStudent />}
            />
            <Route path="/employee/exam" element={<Examination />} />
            <Route path="/employee/results" element={<Results />} />
            <Route path="/employee/results/add" element={<AddResult />} />
            <Route
              path="/employee/results/edit/:resultId"
              element={<EditResult />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
