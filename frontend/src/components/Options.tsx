import { useRecoilValue } from "recoil"
import { darkModeState } from "../store/atoms/atoms"
import { ChangeEvent } from "react"


const Options = ({label,onChange,id,value}:{label:string, onChange:(e:ChangeEvent<HTMLSelectElement>)=>void,id:string,value:string}) => {
    const darkMode = useRecoilValue(darkModeState)
  return (
    <>
    <div className={`text-sm font-medium text-left py-2 ${darkMode?"text-white":""}`}>
    <label htmlFor={label}>{label}</label>
    </div>
     <select  onChange={onChange} id={id} value={value} name="options" className={` border text-sm rounded-lg  block w-full p-2.5
     ${darkMode?"bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500":
     "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"}`}>
        <option  >Cpp</option>
        <option  >Java</option>
        <option  >Javascript</option>
        <option  >Python</option>

       {/* {options.map((option,index)=> (
            <option  key={index}>{option}</option>
       ))} */}
     </select>
     </>
  )
}

export default Options
