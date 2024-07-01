import React from "react";
// import '../../styles/sidebar.css'
import { Link } from "react-router-dom";
import { MdDashboard, MdClass, MdEventAvailable } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { GiArchiveResearch } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
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
      name: "Subjects Enrollment",
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
      icon: <MdEventAvailable className="text-2xl" />,
      name: "Teacher Availability",
      link: "/employee/teacheravailability",
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
    navigate("/");
  };
  return (
    <>
      <div className="md:w-[35%] w-[12%] py-3 h-screen">
        <div className="fixed top-0">
          <ul className="">
            <li className="hidden md:block justify-center text-center text-3xl pl-14 py-4 font-bold">
              Result Management <br /> System
            </li>
            <hr className=" text-center justify-center ml-12 pb-2" />
            {nav.map((navigate) => (
              <li className="hover:bg-slate-300 cursor-pointer md:ml-10 px-2 py-3 rounded-lg">
                <Link to={navigate.link} className="flex items-center gap-2">
                  <span>{navigate.icon}</span>
                  <span className="hidden md:block font-bold text-base uppercase text-blue-950">
                    {navigate.name}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={logout}
                className="md:ml-10 ml-[2px] md:w-full mt-6 bg-slate-300 md:px-3 px-1 py-2 rounded-full font-bold  text-base hover:bg-blue-950 hover:text-white"
              >
                <span className="hidden md:block">LOGOUT</span>
                <CiLogout className="block md:hidden font-bold"/>
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
