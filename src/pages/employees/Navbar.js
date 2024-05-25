import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className='flex items-center justify-around bg-blue-950 py-3'>
        <div className='items-center'>
          <p className='text-xl my-auto font-bold uppercase text-slate-300'>
            Students Result
          </p>
        </div>
        <div className='gap-2'>
          {location.pathname !== '/students/checkteacheravailability' && (
            <button className='bg-slate-300 px-3 mr-2 rounded-full font-bold text-base'>
              <Link to='/students/checkteacheravailability'>
                Check Teacher Availability
              </Link>
            </button>
          )}
          {location.pathname !== '/students/studentresult' && (
            <button className='bg-slate-300 px-3 mr-2 rounded-full font-bold text-base'>
              <Link to='/students/studentresult'>Check Result</Link>
            </button>
          )}
          <button className='bg-slate-300 px-3 rounded-full font-bold text-base'>
            <Link to='/students/login'>Logout</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
