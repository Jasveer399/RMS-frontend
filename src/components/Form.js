import React from 'react'

function Form({title, name}) {
  return (
    <>
        <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id={name}
                name={name}
                type="text"
                className="w-60 border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-950 transition-colors focus:outline-none peer bg-inherit rounded-lg"
              />
              <label
                for={name}
                className="absolute left-0 top-1 px-2 items-center cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-950"
                >{title}</label>
            </div>
          </div>
    </>
  )
}

export default Form