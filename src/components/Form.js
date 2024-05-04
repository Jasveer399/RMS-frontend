import React from 'react'

function Form({title, name}) {
  return (
    <>
          <div class="input flex flex-col w-fit static">
            <label
              for={name}
              class="text-blue-950 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
              >{title}</label>
            <input
              id={name}
              type="text"
              placeholder={`${title} Here...`}
              name={name}
              class="border-blue-950 input px-[10px] py-[11px] text-xs bg-transparent border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
            />
          </div>
    </>
  )
}

export default Form