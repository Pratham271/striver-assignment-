import { useRecoilValue } from "recoil"
import Form from "../components/Form"
import { darkModeState } from "../store/atoms/atoms"


const Landing = () => {
    const darkMode = useRecoilValue(darkModeState)
  return (
    <div className={`h-screen ${darkMode?"bg-gray-800":""}`}>
        <Form/>
    </div>
  )
}

export default Landing
