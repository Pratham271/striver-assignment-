
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { darkModeState } from '../store/atoms/atoms'
import { BsSunFill } from "react-icons/bs";
import { BsMoonStarsFill } from "react-icons/bs";

const Appbar = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState)
  return (
    <div className={`shadow h-14 flex justify-between ${darkMode?"bg-[#0d161f] text-white":"bg-white"}`}>
        <div className="flex flex-col justify-center h-full ml-4">
            <Link to='/'>Home</Link>
        </div>
        <div className="flex flex-col justify-center h-full">
            <button onClick={()=> setDarkMode(!darkMode)}>{darkMode?<BsSunFill/>:<BsMoonStarsFill/>}</button>
        </div>
        <div className="flex flex-col justify-center h-full mr-4">
        <Link to='/display'>Display</Link>
        </div>
    </div>
  )
}

export default Appbar
