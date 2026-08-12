import React from 'react'

export const Ficha = () => {

  return (
    <section className='bg-[#F4F2EE]'>
        <section className='container'>
            <div className='grid grid-cols-[1fr_350px] gap-10 '>
                <section className='bg-white p-10 my-15 rounded-2xl '>
                    <form action="">
                        <h1 className='text-3xl font-bold text-[#282e71] mb-5'>Sua ficha clínica</h1>
                        <div className='grid grid-cols-2 gap-5 border-b border-black/30 pb-10'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="nome">Nome</label>
                                    <input type="text" name="nome" className='py-2 px-4  rounded-2xl border border-black/30'/>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="">Sobrenome </label>
                                    <input type="text" name="sobrenome" id="" className='py-2 px-4 rounded-2xl border border-black/30' />
                               
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="">Contato Emergencia </label>
                                    <input type="text" name="contatoEmergencia" id="" className='py-2 px-4 rounded-2xl border border-black/30'/>
                               
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span htmlFor="">Sexo </span>
                                    <select name="sexo" id="" className='border border-black/30 py-2 px-4 rounded-2xl'>
                                        <option value=""></option>
                                        <option value="Masculino">Maculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <span className='text'>Tipo sanguineo </span>
                                    <select name="sexo" id="" className='border border-black/30 py-2 px-4 rounded-2xl'>
                                        <option value="selecione">Selecione um tipo</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                            </div>

                        </div>
                        <span className='text-black/30 text-sm uppercase block my-2 font-bold tracking-wider'>Historico clínico</span>
                        <div className='grid grid-cols-2 gap-5 pb-10 border-b border-black/20'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor=""> Alergias </label>
                                    <textarea name="" id="" className='border border-black/30 py-2 px-4 rounded-xl'></textarea>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor=""> Medicamentos utilizados </label>
                                    <textarea name="" id="" className='border border-black/30 py-2 px-4 rounded-xl'></textarea>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="">Doenças</label>
                                    <textarea name="" id="" className='border border-black/30 py-2 px-4 rounded-xl'></textarea>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="">Cirurgias realizadas</label>
                                    <textarea name="" id="" className='border border-black/30 py-2 px-4 rounded-xl'></textarea>
                            </div>
                        </div>
                        
                        <span className='text-black/30 text-sm uppercase block my-2 font-bold tracking-wider'>Senha pública</span>
                        <div className='grid grid-cols-[200px_auto] gap-10'>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="senhaPublica">4 a 6 digitos</label>
                                        <input name="senhaPublica" id="" className='border border-black/30 py-2 px-4 rounded-xl'/>
                            </div>
                              <div className='bg-gray-400/30 p-4 rounded-2xl text-sm'>
                                    <p className='text-black/50'>Ela é pedida a quem escanear o QR. Será impressa ao lado do código, nunca dentro dele assim o código sozinho não expõe seus dados.</p>
                              </div>
                        </div>
                    </form>
                </section>
                <div className='bg-white h-70 mt-15 rounded-2xl'>

                </div>
            </div>
        </section>
    </section>
  )
}
