import React, {  useRef } from 'react'

function Form(props) {
  const inputRef = useRef()
  const handleChange = () => {
    props.onChange(props.name, inputRef.current.value);
  };

  return (
    <>
          <div class="input flex flex-col w-fit static">
            <label
              for={props.name}
              class="text-blue-950 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
              >{props.title}</label>
            <input
              ref={inputRef}
              id={props.name}
              type="text"
              placeholder={`${props.title} Here...`}
              name={props.name}
              value={props.value} // Set value prop
              class="border-blue-950 input px-[10px] py-[11px] text-xs bg-transparent border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
              onChange={handleChange}
            />
          </div>
    </>
  )
}

export default Form