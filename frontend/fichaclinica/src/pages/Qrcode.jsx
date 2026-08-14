import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'


export const Qrcode = () => {
const [ficha, setFicha] = useState(null);

useEffect(() => {
    async function carregarPerfil() {
        const token = localStorage.getItem("token");

        const resposta = await axios.get(
            "http://localhost:3003/perfil",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
console.log(resposta.data);
        setFicha(resposta.data);
    }

    carregarPerfil();
}, []);

const [qr, setQr] = useState("");

useEffect(() => {
    if (ficha?.codigoPublico) {
        const url = `http://192.168.15.15:5173/paginapublica/${ficha.codigoPublico}`;

        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;

setQr(qrCode);
    }
}, [ficha]);
  return (
    <div className='container mt-20'>
       <div className='bg-gray-200 m-auto w-150 p-10'>
        {qr && <img src={qr} alt="QR Code" />}
        
    </div>
    </div>
  )
}
