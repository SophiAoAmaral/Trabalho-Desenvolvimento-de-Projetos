import { Link, Route, Routes } from "react-router"
import { Login } from "./pages/Login"
import './App.css'
import { Ficha } from "./pages/Ficha"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

function App() {


  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/ficha" element={<Ficha/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
