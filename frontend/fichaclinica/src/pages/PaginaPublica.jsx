import React from 'react'
import { useLocation } from "react-router";
export const PaginaPublica = () => {
    

const location = useLocation();

const { ficha } = location.state;
  return (
    <div></div>
  )
}
