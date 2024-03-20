import { useRecoilValue } from "recoil"
import Users from "../components/Users"
import { darkModeState } from "../store/atoms/atoms"


const Dashboard = () => {
  const darkMode = useRecoilValue(darkModeState)
  return (
    <div className={`h-screen ${darkMode?"bg-gray-800 text-white":""}`}>
      <Users/>
    </div>
  )
}

export default Dashboard
