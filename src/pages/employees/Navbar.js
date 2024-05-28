import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("loginStudent");
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-around bg-blue-950 py-3">
        <div className="items-center">
          <p className="text-xl my-auto font-bold uppercase text-slate-300">
            Students Result
          </p>
        </div>
        <div className="gap-2">
          {location.pathname !== "/students/checkteacheravailability" && (
            <button className="bg-slate-300 px-3 mr-2 rounded-full font-bold text-base">
              <Link to="/students/checkteacheravailability">
                Check Teacher Availability
              </Link>
            </button>
          )}
          {location.pathname !== "/students/studentresult" && (
            <button className="bg-slate-300 px-3 mr-2 rounded-full font-bold text-base">
              <Link to="/students/studentresult">Check Result</Link>
            </button>
          )}
          <button
            onClick={logOut}
            className="bg-slate-300 px-3 rounded-full font-bold text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
