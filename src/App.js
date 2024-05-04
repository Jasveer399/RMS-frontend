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
import AddClass from './pages/employees/AddClass';
import Examination from "./pages/employees/Examination";
import StudentLogin from './pages/StudentLogin';
import StudentHome from './pages/StudentHome';
import Subjects from "./pages/employees/Subjects";
import ChangePassword from "./pages/employees/ChangePassword";
import ProtectedRoute from './components/ProtectedRoute';
import SubjectCombinations from "./pages/employees/SubjectCombinations";


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
                <StudentLogin/>
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
                <StudentHome/>
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
          <Route
            path="/employee"
            element={
              <PublicRoute>
                <EmployeeHome />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/students"
            element={
              <PublicRoute>
                <Students />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/students/add"
            element={
              <PublicRoute>
                <AddStudent />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/classes"
            element={
              <PublicRoute>
                <Classes />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/classes/add"
            element={
              <PublicRoute>
                <AddClass/>
              </PublicRoute>
            }
          />
          <Route
            path="/employee/subjects"
            element={
              <PublicRoute>
                <Subjects />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/changepassword"
            element={
              <PublicRoute>
                <ChangePassword />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/subjectscombination"
            element={
              <PublicRoute>
                <SubjectCombinations />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/students/edit/:rollNo"
            element={
              <PublicRoute>
                <EditStudent />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/exam"
            element={
              <PublicRoute>
                <Examination/>
              </PublicRoute>
            }
          />
          <Route
            path="/employee/results"
            element={
              <PublicRoute>
                <Results />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/results/add"
            element={
              <PublicRoute>
                <AddResult />
              </PublicRoute>
            }
          />
          <Route
            path="/employee/results/edit/:resultId"
            element={
              <PublicRoute>
                <EditResult />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
