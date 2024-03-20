import { useRecoilValue } from 'recoil';
import { darkModeState } from '../store/atoms/atoms';



const Skeleton = () => {
  const darkMode = useRecoilValue(darkModeState)
  const elements = Array(8).fill(1)
  return (
    <div className="animate-pulse">
    <div className={`h-4 ${darkMode?"bg-gray-600":"bg-gray-200"} mt-3 mb-6 rounded`}></div>
    {elements.map((_,index)=> (
       <div className={`h-4  mb-6 rounded ${darkMode?"bg-gray-700":"bg-gray-300"}`} key={index}></div>
    ))}

  </div>
  )
}

export default Skeleton
