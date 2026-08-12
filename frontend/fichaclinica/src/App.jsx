import { Link, Route, Routes } from "react-router"
import { Login } from "./pages/Login"
import './App.css'
import { Ficha } from "./pages/Ficha"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { PaginaPublica } from "./pages/PaginaPublica"

function App() {


  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/ficha" element={<Ficha/>}/>
        <Route path='/paginapublica' element={<PaginaPublica/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
