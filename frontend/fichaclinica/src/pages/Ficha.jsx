import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

export const Ficha = () => {
    
    const [ficha, setFicha] = useState({
    nome: "",
    sobrenome: "",
    sexo: "",
    contatoEmergencia: "",
    nomeContatoEmergencia :"",
    tipoSanguineo: "",
    alergias: "",
    medicamentosContinuos: "",
    doencas: "",
    cirurgiasRealizadas: "",
    senhaPublica: ""
});

    function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFicha({
        ...ficha,
        [name]: value
    })};

async function handleSubmit(e) {
    e.preventDefault();
  
    try {
        const token = localStorage.getItem("token");
        
        await axios.put(
            "http://localhost:3003/perfil",
            ficha,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(ficha);
        
    } catch (err) {
     console.log(err)

    }
}
const primeiroCadastro = !ficha.nome;

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

        setFicha(resposta.data);
    }

    carregarPerfil();
}, []);
  return (
    <section className="bg-[#F4F2EE]">
      <section className="container">
        <div className="grid grid-cols-[1fr_350px] gap-10 ">
          <section className="bg-white p-10 my-15 rounded-2xl ">
            <form onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold text-[#282e71] mb-5">
                Sua ficha clínica
              </h1>
              <div className="grid grid-cols-2 gap-5 border-b border-black/30 pb-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={ficha.nome}
                    onChange={handleChange}
                    className="py-2 px-4  rounded-2xl border border-black/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Sobrenome </label>
                  <input
                    type="text"
                    name="sobrenome"
                    value={ficha.sobrenome}
                    onChange={handleChange}
                    id=""
                    className="py-2 px-4 rounded-2xl border border-black/30"
                  />
                </div>
            
                <div className="flex flex-col gap-2">
                  <span htmlFor="">Sexo </span>
                  <select
                    name="sexo"
                    id=""
                    className="border border-black/30 py-2 px-4 rounded-2xl"
                    value={ficha.sexo}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="Masculino">Maculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

            

                <div className="flex flex-col gap-2">
                  <span className="text">Tipo sanguineo </span>
                  <select
                    name="tipoSanguineo"
                    value={ficha.tipoSanguineo}
                    onChange={handleChange}
                    className="border border-black/30 py-2 px-4 rounded-2xl"
                  >
                    <option value="selecione">Selecione um tipo</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                 <div className="flex flex-col gap-2">
                  <label htmlFor="">Contato Emergencia </label>
                  <input
                    type="text"
                    name="contatoEmergencia"
                    value={ficha.contatoEmergencia}
                    onChange={handleChange}
                    id=""
                    className="py-2 px-4 rounded-2xl border border-black/30"
                  />
                </div>
                 <div className="flex flex-col gap-2">
                  <label htmlFor="">Nome contato emergência </label>
                  <input
                    type="text"
                    name="nomeContatoEmergencia"
                    value={ficha.nomeContatoEmergencia}
                    onChange={handleChange}
                    id=""
                    className="py-2 px-4 rounded-2xl border border-black/30"
                  />
                </div>
              </div>
              <span className="text-black/30 text-sm uppercase block my-2 font-bold tracking-wider">
                Historico clínico
              </span>
              <div className="grid grid-cols-2 gap-5 pb-10 border-b border-black/20">
                <div className="flex flex-col gap-2">
                  <label htmlFor=""> Alergias </label>
                  <textarea
                    name="alergias"
                    value={ficha.alergias}
                    onChange={handleChange}
                    className="border border-black/30 py-2 px-4 rounded-xl"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor=""> Medicamentos continuos </label>
                  <textarea
                    name="medicamentosContinuos"
                    value={ficha.medicamentosContinuos}
                    onChange={handleChange}
                    className="border border-black/30 py-2 px-4 rounded-xl"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Doenças</label>
                  <textarea
                    name="doencas"
                    value={ficha.doencas}
                    onChange={handleChange}
                    className="border border-black/30 py-2 px-4 rounded-xl"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Cirurgias realizadas</label>
                  <textarea
                    name="cirurgiasRealizadas"
                    value={ficha.cirurgiasRealizadas}
                    onChange={handleChange}
                    className="border border-black/30 py-2 px-4 rounded-xl"
                  ></textarea>
                </div>
              </div>

              <span className="text-black/30 text-sm uppercase block my-2 font-bold tracking-wider">
                Senha pública
              </span>
              <div className="grid grid-cols-[200px_auto] gap-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="senhaPublica">4 a 6 digitos</label>
                  <input
                    name="senhaPublica"
                    value={ficha.senhaPublica}
                    onChange={handleChange}
                    className="border border-black/30 py-2 px-4 rounded-xl"
                  />
                </div>
                <div className="bg-gray-400/30 p-4 rounded-2xl text-sm">
                  <p className="text-black/50">
                    Ela é pedida a quem escanear o QR. Será impressa ao lado do
                    código, nunca dentro dele assim o código sozinho não expõe
                    seus dados.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 mt-6">
                <button type="submit" className='bg-[#282e71] text-white py-3 px-6 rounded-2xl '>
                  {primeiroCadastro ? "Salvar ficha" : "Atualizar ficha"}
                </button>
              </div>
            </form>
          </section>
          <div className="bg-white h-75 mt-15 rounded-2xl p-5">
            <h3 className='font-bold text-[#282e71]'>Previa ficha publica</h3>
            <p className='text-sm mb-2'>É isto que um socorrista vê após escanear o QR Code.</p>
            <div className='border p-4 rounded-2xl'>
                <h2 className='text-2xl mb-2'>{ficha.nome} {ficha.sobrenome}</h2>
                <div className='flex gap-5 **:border **:px-2 **:py-1 **:rounded-2xl'>
                    <span>{ficha.sexo}</span>
                    <span>{ficha.tipoSanguineo}</span>
                </div>
                <p className='mt-2'>{ficha.nomeContatoEmergencia} {ficha.contatoEmergencia}</p>
            </div>
            <Link to='/fichapublica' className='bg-[#282e71] py-2 px-4 text-white rounded-2xl block mt-4 text-center'>Abrir ficha publica</Link>
          </div>
          
        </div>
      </section>
    </section>
  );
}
