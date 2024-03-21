import { useRecoilValue } from "recoil"
import { darkModeState } from "../store/atoms/atoms"
import { ChangeEvent } from "react"


const Input = ({label,placeholder,onChange,id}:{label:string, placeholder:string,onChange:(e: ChangeEvent<HTMLInputElement>)=>void,id:string}) => {
    const darkMode = useRecoilValue(darkModeState)
    return (
        <>
        <div className={`text-sm font-medium text-left py-2 ${darkMode?"text-white":""}`}>
            <label htmlFor={label}>{label}</label>
        </div>
        <input id={id} onChange={onChange} type="text" placeholder={placeholder} className={`mt-1 px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full 
        ${darkMode?"bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500":"bg-white border-slate-300 placeholder-slate-400"}`}/>
      
        </>
      )
}

export default Input
