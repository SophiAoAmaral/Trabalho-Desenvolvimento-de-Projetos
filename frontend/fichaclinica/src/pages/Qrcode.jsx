import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'


export const Qrcode = () => {
const [ficha, setFicha] = useState(null);
const [confirmar, setConfirmar] = useState(false)
const navigate = useNavigate();

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

async function excluirConta() {
    setConfirmar(true)
    if (!confirmar) return;

    try {
        const token = localStorage.getItem("token");

        await axios.delete(
            "http://localhost:3003/perfil",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        localStorage.removeItem("token");
        navigate("/");

    } catch (err) {
        console.log(err);
    }
}


  return (
    <section className="bg-[#F4F2EE] h-[100vh]">
      <button
        className="ml-40 mt-10 mb-15 text-blue-600 underline cursor-pointer hover:text-blue-800"
        onClick={() => navigate("/ficha")}
      >
        ← Voltar
      </button>
      <div className="container mt-5 flex flex-wrap justify-between ">
        <div className="bg-white m-auto w-150 p-3 items-center gap-4">
          {qr ? (
            <div>
              <div className="flex gap-10 border border-dashed p-4">
                <img src={qr} alt="QR Code" className="w-60" />
                <div>
                  <h2 className="text-3xl">
                    {ficha.nome} {ficha.sobrenome}
                  </h2>
                  <span className="text-gray-500/50">
                    Ficha clínica de emergencia
                  </span>
                  <div className="mt-10 flex flex-col">
                    <span className="tracking-widest uppercase text-xl text-gray-600">
                      Senha
                    </span>
                    <span className="text-2xl tracking-[10px]">
                      {ficha.senhaPublica}
                    </span>
                  </div>
                </div>
              </div>
              <div className=" flex gap-10 mt-5 p-3">
                <button className="cursor-pointer bg-[#282e71] text-white px-8 py-3 rounded-2xl hover:bg-[#15183c]">
                  Imprimir
                </button>
                <button
                  onClick={() =>
                    navigate(`/paginapublica/${ficha.codigoPublico}`)
                  }
                  className=" cursor-pointer border rounded-2xl px-8 py-3"
                >
                  Ver como socorrista
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Gerando QR Code...</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-10">
          <div className="bg-white w-100 p-5 flex flex-col gap-5 rounded-2xl">
            <div className="flex justify-between">
              <p>Ficha editada em</p>
              <span>{ficha?.updatedAt.slice(0, 10)}</span>
            </div>
            <button
              className="border py-2 rounded-2xl hover:bg-[#282e71] hover:text-white"
              onClick={() => navigate("/ficha")}
            >
              Editar ficha
            </button>
          </div>
          <div className="bg-red-400/10 border border-red-600 w-100 flex flex-col items-start p-5 gap-1 rounded-2xl">
            <h2 className="uppercase text-red-600 font-bold">
              Apagar registro
            </h2>
            <span className="text-sm">
              Remove todos os dados clínicos. O link público deixa de funcionar
              imediatamente e o cartão impresso fica inválido.
            </span>
            <button
              type="button"
              onClick={excluirConta}
              className="border-red-500 border rounded-2xl bg-[#F2F2F2] hover:bg-red-500 hover:text-white py-2 mt-2 px-6 cursor-pointer"
            >
              Apagar registro
            </button>
          </div>
        </div>
        {confirmar && (
          <div>
            <div className="overlay">
              <article className="active">
                <h1 className="text-3xl mt-2 text-red-600 font-bold">
                  Deseja apagar seu registro?
                </h1>
                <p className="text-sm mt-3 text-gray-500">
                  Esta ação é permanente e não poderá ser desfeita. Todos os
                  dados relacionados a este item serão removidos definitivamente
                </p>
                <span className="text-sm my-2 text-gray-500">
                  Se tiver certeza, clique em Excluir para confirmar. Caso
                  contrário, selecione Cancelar para manter o registro
                </span>
                <button
                  className="py-3 px-6 w-50 rounded-2xl border border-red-500  bg-red-600/30 hover:bg-red-600/50 text-red-700 mb-3 cursor-pointer"
                  onClick={excluirConta}
                >
                  Confirmar
                </button>
                <button
                  className="py-3 px-6 w-50 border rounded-2xl cursor-pointer"
                  onClick={() => setConfirmar(false)}
                >
                  Cancelar
                </button>
              </article>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
