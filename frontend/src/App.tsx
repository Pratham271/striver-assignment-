import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Appbar from "./components/Appbar"
import { RecoilRoot } from "recoil"


function App() {
  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
      <Appbar/>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/display" element={<Dashboard/>}/>
            <Route path="*" element={<Landing/>} />
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </>
       
  )
}

export default App
