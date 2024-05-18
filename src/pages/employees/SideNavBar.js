import React from "react";
// import '../../styles/sidebar.css'
import { Link } from "react-router-dom";
import { MdDashboard, MdClass } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { GiArchiveResearch } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SideNavBar = () => {
  const navigate = useNavigate();
  const nav = [
    {
      icon: <MdDashboard className="text-2xl" />,
      name: "Dashboard",
      link: "/employee",
    },
    {
      icon: <MdClass className="text-2xl" />,
      name: "Classes",
      link: "/employee/classes",
    },
    {
      icon: <FaBook className="text-2xl" />,
      name: "Subjects",
      link: "/employee/subjects",
    },
    {
      icon: <SiBookstack className="text-2xl" />,
      name: "Subjects Combination",
      link: "/employee/subjectscombination",
    },
    {
      icon: <PiStudentFill className="text-2xl" />,
      name: "Students",
      link: "/employee/students",
    },
    {
      icon: <GiArchiveResearch className="text-2xl" />,
      name: "Result",
      link: "/employee/results",
    },
    {
      icon: <RiLockPasswordFill className="text-2xl" />,
      name: "Change Password",
      link: "/employee/changepassword",
    },
  ];

  const logout = () => {
    toast.success("User Logout SuccessFully");
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminToken_setupTime');
    //  localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="w-[35%] py-3 border-r-2 border-blue-950 h-screen">
        <div className="fixed top-0">
          <ul className="">
            <li className="justify-center text-center text-3xl pl-14 py-4 font-bold">
              Result Management <br /> System
            </li>
            <hr className=" text-center justify-center ml-12 pb-2" />
            {nav.map((navigate) => (
              <li className="hover:bg-slate-300 cursor-pointer ml-10 px-2 py-3 rounded-lg">
                <Link to={navigate.link} className="flex items-center gap-2">
                  <span>{navigate.icon}</span>
                  <span className="font-bold text-base uppercase text-blue-950">
                    {navigate.name}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={logout}
                className="ml-10 w-full mt-16 bg-slate-300 px-3 rounded-full font-bold  text-base hover:bg-blue-950 hover:text-white"
              >
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* <nav className="">
          <ol>
              <li className=""><a href="#0">Dashboard</a></li>
              <li className=""><Link to="/employee/students">Students</Link></li>
              <li className=""><Link to="/employee/classes">Classes</Link></li>
              <li className=""><Link to="/employee/exam">Examination</Link></li>
              <li className=""><Link to="/employee/results">Result</Link></li>
          </ol>
      </nav>  */}
    </>
  );
};

export default SideNavBar;
