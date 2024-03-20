import  { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '../store/atoms/atoms';

const Button = memo(({label}:{label:string }) => {
  const darkMode = useRecoilValue(darkModeState)
  return (
        <button  type="submit" className={`w-full ${darkMode?"text-black bg-white hover:bg-gray-200":"text-white bg-gray-800 hover:bg-gray-900"}  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4`}>{label}</button>
  )
})

export default Button
