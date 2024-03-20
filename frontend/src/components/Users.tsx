import { useRecoilValue } from "recoil"
import { loadingState } from "../store/atoms/atoms"
import Skeleton from "./Skeleton"
import TableData from "./TableData"

const Users = () => {
    const loading = useRecoilValue(loadingState)
  return (
    
<div className="relative overflow-x-auto pt-4">
    <div className="p-4">
    Users Data
    </div>
   {loading===true?<Skeleton/>:<TableData/>}
</div>

  )
}

export default Users
