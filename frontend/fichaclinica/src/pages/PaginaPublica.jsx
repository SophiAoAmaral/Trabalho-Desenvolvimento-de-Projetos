import React from 'react'
import { useLocation } from "react-router";
export const PaginaPublica = () => {
    

const location = useLocation();

const { ficha } = location.state;
  return (
    <section className='bg-[#F4F2EE] h-[85vh]'>
      <div className='container pt-15'>
          <div className=' bg-white w-160 m-auto rounded-2xl'>
            <div className='p-5'>
              <h2 className='text-4xl font-bold mb-2'>{ficha.nome}</h2>
              <div className='**:block flex gap-4 **:border **:px-2 **:rounded-2xl'>
                <span>{ficha.sexo}</span>
                <span>TIPO {ficha.tipoSanguineo}</span>
              </div>
            </div>
            <article className='bg-black/7 my-3 px-5 py-2'>
              <span className='uppercase text-xs tracking-widest'>Contato de emergencia</span>
              <h2 className='text-3xl mb-2'>{ficha.nomeContatoEmergencia} - {ficha.numeroEmergencia}</h2>
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
