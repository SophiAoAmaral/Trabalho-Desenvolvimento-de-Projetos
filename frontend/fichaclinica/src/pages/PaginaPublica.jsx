import React from 'react'
import { useLocation, useNavigate,useParams } from "react-router";
import { useEffect, useState,} from 'react';
import axios from 'axios';
export const PaginaPublica = () => {
    
const [ficha, setFicha] = useState(null);
const { codigo } = useParams();
const location = useLocation();
const navigate = useNavigate();
console.log(codigo);

useEffect(() => {
    async function buscarFicha() {
        try {
            const resposta = await axios.get(
                `http://localhost:3003/publico/${codigo}`
            );

            setFicha(resposta.data);
console.log(resposta.data);
        } catch (err) {
            console.log(err);
        }
    }

    buscarFicha();
}, [codigo]);


if (!ficha) {
    return <h1>Carregando...</h1>;
}
  return (
    <section className='bg-[#F4F2EE] h-[85vh]'>
      <button className='ml-50 mt-5 text-blue-600 underline cursor-pointer hover:text-blue-800' onClick={() => navigate('/ficha')}>← Voltar</button>
      <div className='container pt-20'>
          <div className=' bg-white w-160 m-auto rounded-2xl'>
            <div className='p-5'>
              <h2 className='text-4xl font-bold mb-2'>{ficha.nome}</h2>
              <div className='**:block flex gap-4 **:border **:px-2 **:rounded-2xl'>
                <span>{ficha.sexo}</span>
                <span className='bg-[#282e71] text'>TIPO {ficha.tipoSanguineo}</span>
              </div>
            </div>
            <article className='bg-black/7 mt-2 mb-3 px-5 py-2 flex justify-between items-center' >
              <div>
                <span className='uppercase text-xs tracking-widest'>Contato de emergencia</span>
                <h2 className='text-3xl mb-2'>{ficha.nomeContatoEmergencia} - {ficha.contatoEmergencia}</h2>
              </div>
              <div className='mr-5'>
                <button className='bg-[#282e71] cursor-pointer px-7  py-2 text-white rounded-2xl'>Ligar</button>
              </div>
            </article>

            <div className='grid grid-cols-2 p-5 gap-4'>
              <div className='flex flex-col **:block'>
                <span className='uppercase text-black/40 font-bold'>alergias</span>
                <span>{ficha.alergias}</span>
              </div>
              <div className='flex flex-col **:block'>
                <span className='uppercase text-black/40 font-bold'>Medicamentos</span>
                <span>{ficha.medicamentosContinuos}</span>
              </div>
              <div className='flex flex-col **:block'>
                <spa className='uppercase text-black/40 font-bold'n>doencas</spa>
                <span>{ficha.doencas}</span>
              </div>
              <div className='flex flex-col **:block'>
                <span className='uppercase text-black/40 font-bold'>cirurgias</span>
                <span>{ficha.cirurgiasRealizadas}</span>
              </div>
              
              
            </div>
          </div>
        </div>
      
      </section>
  )
}
