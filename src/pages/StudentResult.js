import React from 'react'
import Navbar from './employees/Navbar'
import Form from '../components/Form'

function StudentResult() {
  return (
    <>
    <Navbar/>
    <h6 className='text-center text-xl pb-2 mt-3 underline'>Check Result Here</h6>
    <div className='flex justify-center'>
        <Form
        title="Search"
        name="search"
        type="search"
        />
    </div>
    <div className="flex items-center justify-center my-3">
        <button className="bg-blue-950 text-white px-4 font-bold">Search</button>
    </div>
    <div className='text-6xl py-5 justify-center text-center font-bold'>RESULT GOSE HERE</div>
    <div className="flex items-center justify-center my-3">
        <button className="bg-blue-950 text-white px-4 font-bold">Print Result</button>
    </div>
    </>
  )
}

export default StudentResult