import { useRecoilValue } from "recoil"
import { darkModeState } from "../store/atoms/atoms"
import { ChangeEvent } from 'react';


const Textarea = ({label,placeholder,onChange,id}:{label:string, placeholder:string,onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void,id:string}) => {
    const darkMode = useRecoilValue(darkModeState)
  return (
    <>
    <div  className={`text-sm font-medium text-left py-2 ${darkMode?"text-white":""}`}>
    <label htmlFor={label}>{label}</label>
    </div>
     <textarea id={id} onChange={onChange} rows={20} className={`block p-2.5 w-full text-sm  overflow-y-scroll
       rounded-lg border ${darkMode?"bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500":
      "text-gray-900 bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`} 
     placeholder={placeholder}></textarea>
     </>
  )
}

export default Textarea
