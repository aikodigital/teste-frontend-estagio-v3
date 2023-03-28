import React from 'react'
import arvore from '../../img/arvore.png'

interface LandingProps {
  setDashLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Landing({ setDashLoaded }: LandingProps) {
  
  const setDashboard = () => {
    setDashLoaded(true)
  }

  return (
    <div className='flex px-[190px] h-screen bg-[#161616] text-white font-extrabold'>
      <div>
        <main className='px-[340px] pt-[335px]'>
          <h1 className='text-4xl mb-[90px]'><span className='text-[#006404]'>Forest</span>Finder</h1>
          <p className='text-3xl w-[350px]'>Centralize o controle de seus equipamentos</p>
          <p className='mt-[30px]'>De forma rápida e segura.</p>
          <button className='w-[350px] h-[70px] mt-[64px] bg-[#006404] rounded' onClick={setDashboard}>Iniciar</button>
        </main>
      </div>
      <div>
        <img src={arvore} className="mt-[335px]" alt="" />
      </div>
    </div>
  )
}
