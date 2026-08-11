import { Link, Route, Routes } from "react-router"
import { Login } from "./pages/Login"
import './App.css'
import { Ficha } from "./pages/Ficha"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/ficha" element={<Ficha/>}/>
      </Routes>
    </>
  )
}

export default App
