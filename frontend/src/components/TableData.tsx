import { useRecoilValue, useSetRecoilState } from "recoil"
import { darkModeState } from "../store/atoms/atoms"
import { useEffect, useState } from "react"
import axios from "axios"
import { loadingState } from "../store/atoms/atoms"


const TableData = () => {
    const tableHead = ["Id","Username","Language","Stdin","Code","Stdout","createdAt"]
    const darkMode = useRecoilValue(darkModeState)
    const [tableData,setTableData] = useState<any[]>([])
    const setLoading = useSetRecoilState(loadingState)
    useEffect(()=> {
        
        axios.get("https://striver-assignment.onrender.com/api/v1/assignment/striver/display")
        .then((response)=> {
            setLoading(true)
            const limitedResponse = response.data.allData.map((item: { createdAt: Date  }) => {
                const timestamp = new Date(item.createdAt);
                const formattedTimestamp = timestamp.toUTCString(); // or toLocaleString() for local time
                
                return { ...item, createdAt: formattedTimestamp };
            });
            
            setTableData(limitedResponse);
            setLoading(false);
        })
    },[])
  return (
    <>
       <table className={`w-full text-sm text-left  ${darkMode?"text-gray-400":"text-gray-500"} mt-4`}>
        <thead className={`text-xs  uppercase ${darkMode?"bg-gray-600 text-gray-200":"bg-gray-50 text-gray-700"}`}>
            <tr>
                {tableHead.map((thead,index)=> (
                    <th scope="col" className="px-6 py-3" key={index}>{thead}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {
                tableData.map((tdata,index)=> (
                    <tr className={` border-b hover:bg-gray-50 ${darkMode?"bg-gray-700 border-gray-600 hover:bg-gray-500":"bg-white"}`} key={index}>
                        <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${darkMode?"text-white":""}`}>
                            {tdata.id}
                        </th>
                        <td className="px-6 py-4">
                            {tdata.username}
                        </td>
                        <td className="px-6 py-4">
                            {tdata.codeLanguage}
                        </td>
                        <td className="px-6 py-4">
                            {tdata.stdin}
                        </td>
                        <td className="px-6 py-4">
                            {tdata.sourceCode.length===100?tdata.sourceCode + "....":tdata.sourceCode}
                        </td>
                        <td className="px-6 py-4">
                            {tdata.stdout}
                        </td>
                        <td className="px-6 py-4">
                            {tdata.createdAt}
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </>
  )
}

export default TableData
