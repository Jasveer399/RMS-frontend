import React from 'react'

function Navbar() {
  return (
    <>
        <div className='flex items-center justify-around bg-blue-950 py-3'>
            <div className='items-center'>
                <p className='text-xl my-auto font-bold uppercase text-slate-300'>Students Result</p>
            </div>
            <div>
                <button className='bg-slate-300 px-3 rounded-full font-bold  text-base'>LOGOUT</button>
            </div>
        </div>
    </>
  )
}

export default Navbar