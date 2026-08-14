import { Link, Route, Routes } from "react-router"
import { Login } from "./pages/Login"
import './App.css'
import { Ficha } from "./pages/Ficha"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { PaginaPublica } from "./pages/PaginaPublica"
import { Qrcode } from "./pages/Qrcode"

function App() {


  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/ficha" element={<Ficha/>}/>
        <Route path='/paginapublica/:codigo' element={<PaginaPublica/>}/>
        <Route path="/qrcode" element={<Qrcode/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
