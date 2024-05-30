// import { Col, Row } from "antd";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import { MdDashboard, MdClass, MdEventAvailable } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { GiArchiveResearch } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";

function EmployeeHome() {
  const navigate = useNavigate();
  const nav = [
    {
        icon: <MdDashboard className="text-green-950"/>,
        name: "Dashboard",
        link: "/employee"
    },
    {
        icon: <MdClass />,
        name: "Classes",
        link: "/employee/classes"
    },
    {
        icon: <FaBook />,
        name: "Subjects",
        link: "/employee/subjects"
    },
    {
        icon: <SiBookstack />,
        name: "Subjects Enrollment",
        link: "/employee/subjectscombination"
    },
    {
        icon: <PiStudentFill />,
        name: "Students",
        link: "/employee/students"
    },
    {
        icon: <GiArchiveResearch/>,
        name: "Result",
        link: "/employee/results"
    },
    {
        icon: <MdEventAvailable />,
        name: "Teacher Availability",
        link: "/employee/teacheravailability"
    },
    {
      icon: <RiLockPasswordFill />,
      name: "Change Password",
      link: "/employee/changepassword"
  },
]
  return (
    <>
    {/* <Navbar/> */}
    <div className="flex">
      <SideNavBar />
      <div className="w-full border-l-2 border-blue-950">
        <h1 className="text-5xl uppercase text-center mt-4">Quick Links</h1>
        <div className="flex flex-wrap">
        {nav.map((navigate) => (
        <div class="flex flex-col md:w-1/3 bg-white rounded-3xl">
          <div class="px-6 py-8 sm:p-10 sm:pb-6">
            <div class="grid items-center justify-center w-full grid-cols-1">
              <div className="mx-auto text-9xl ">
                {navigate.icon}
              </div>
            </div>
          </div>
          <div class="flex px-6 pb-8 sm:px-8">
            <Link
              to={navigate.link}
              class="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-[#333] rounded-full nline-flex text-base font-bold"
            >
              {navigate.name}
            </Link>
          </div>
        </div>
        ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default EmployeeHome;
