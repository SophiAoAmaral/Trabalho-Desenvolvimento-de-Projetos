import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useLocation } from "react-router";

export const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] =useState(true);
    const location = useLocation();
    const [mensagem, setMensagem] = useState(location.state?.mensagem || "");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [usuario, setUsuario] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: ""
});

    const[error, setError]= useState('');

    function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    console.log("name:", name);
    console.log("value:", value);

    setUsuario({
        ...usuario,
        [name]: value
    });
}

async function handleSubmit(e) {
    e.preventDefault();

    if (usuario.senha.length < 8) {
        setError("A senha deve ter no mínimo 8 caracteres.");
        setTimeout(() => {
        setError('')
    }, 3000);
        return;
    }

    if (usuario.senha !== confirmarSenha) {
        setError("As senhas não coincidem.");
        setTimeout(() => {
        setError('')
    }, 3000);
        return;
    }

    try {
        await axios.post("http://localhost:3003/usuarios", usuario);

        setLogin(true);

        setUsuario({
            nome: "",
            sobrenome: "",
            email: "",
            senha: "",
        });

        setConfirmarSenha("");

    } catch (err) {
        setError(err.response?.data?.mensagem || "Erro ao criar conta");

        setTimeout(() => {
            setError("");
        }, 5000);
    }
}
    
    async function handleLogin(e) {
      e.preventDefault();
      const dadosLogin = {
        email: usuario.email,
        senha: usuario.senha,
      };
      try{
      const resposta = await axios.post(
        "http://localhost:3003/login", 
        dadosLogin
    );
    const token = resposta.data.token;
    localStorage.setItem("token",token)
     navigate("/ficha");
      }catch(err){
        setError(err.response.data.mensagem);
         setTimeout(() => {
        setError('')
    }, 5000);
      }
}
    useEffect(() => {
    if (mensagem) {
        const timer = setTimeout(() => {
            setMensagem("");
        }, 3000);

        return () => clearTimeout(timer);
    }
}, [mensagem]);

  return (
    <section className="bg-[#F4F2EE] h-[87vh]">
      <section className="container ">
        {mensagem && (
          <div className="mb-4 rounded-lg bg-green-100 border border-green-300 p-3 text-green-700">
            {mensagem}
          </div>
        )}
        <section className="grid grid-cols-2 gap-10 pt-20 justify-center items-center">
          <div>
            <h1 className="text-7xl pb-3">
              Suas informações clínicas, disponíveis quando importa.
            </h1>
            <p>
              Cadastre tipo sanguíneo, alergias, medicamentos e contato de
              emergência. O sistema gera um código QR para colar no seu crachá
              protegido por uma senha impressa ao lado dele.
            </p>
          </div>

          <div className="bg-white p-9 rounded-2xl">
            <div className="flex items-center justify-center  mb-3">
              <span className="text-3xl text-[#282e71]">
                {" "}
                {login ? "Entrar" : "Criar Conta"}
              </span>
            </div>

            {login ? (
              <form className="flex flex-col gap-2 " onSubmit={handleLogin}>
                <label htmlFor="email">Email corporativo</label>
                <input
                  type="email"
                  placeholder=""
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  className="py-3 px-5 rounded-2xl border border-black/30"
                />
                <label htmlFor="">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={usuario.senha}
                  onChange={handleChange}
                  className="py-3 px-5 rounded-2xl border border-black/30"
                />
                <div>{error && <p className="text-red-600">{error}</p>}</div>
                <button
                  type="submit"
                  className="mt-3 py-3 px-40 hover:bg-[#282e71] bg-[#454C92] text-white rounded-3xl self-center text-xl cursor-pointer"
                >
                  {login ? "Entrar" : "Cadastrar"}
                </button>
              </form>
            ) : (
              <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 mt-3">
                  <div className="flex flex-col mr-4">
                    <label htmlFor="nome">Nome</label>
                    <input
                      type="text"
                      name="nome"
                      value={usuario.nome}
                      onChange={handleChange}
                      className="py-3  px-3 rounded-2xl border border-black/30"
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input
                      type="text"
                      name="sobrenome"
                      value={usuario.sobrenome}
                      onChange={handleChange}
                      className="py-3 px-3 rounded-2xl border border-black/30"
                    />
                  </div>
                </div>
                <label htmlFor="">Email corporativo</label>
                <input
                  type="email"
                  placeholder=""
                  value={usuario.email}
                  name="email"
                  onChange={handleChange}
                  className="py-3 px-5 rounded-2xl border border-black/30"
                />
                <label htmlFor="">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={usuario.senha}
                  onChange={handleChange}
                  className="py-3 px-5 rounded-2xl border border-black/30"
                />
                <label>Confirmar senha</label>

                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="py-3 px-5 rounded-2xl border border-black/30"
                />
                <div>{error && <p className="text-red-600">{error}</p>}</div>
                <button
                  type="submit"
                  className="mt-3 py-3 px-40 hover:bg-[#282e71] bg-[#454C92] text-white rounded-3xl self-center text-xl cursor-pointer"
                >
                  {login ? "Entrar" : "Cadastrar"}
                </button>
              </form>
            )}

            <div className="flex items-center justify-center *:cursor-pointer mt-1">
              {login ? (
                <span>
                  Não possui conta?{" "}
                  <button
                    onClick={() => setLogin(false)}
                    className="underline text-blue-500"
                  >
                    Criar conta
                  </button>
                </span>
              ) : (
                <span>
                  Ja possui uma conta?{" "}
                  <button
                    onClick={() => setLogin(true)}
                    className="underline text-blue-500"
                  >
                    Entrar
                  </button>
                </span>
              )}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
