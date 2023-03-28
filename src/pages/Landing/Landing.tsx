import React from 'react'

interface LandingProps {
  setDashLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Landing({ setDashLoaded }: LandingProps) {
  
  const setDashboard = () => {
    setDashLoaded(true)
  }

  return (
    <div>
        <h1><span>Forest</span>Finder</h1>
        <p>Centralize o controle de seus equipamentos</p>
        <p>De forma rápida e segura.</p>
        <p className='w-350 h-70 bg-[#006404]' onClick={setDashboard}>Iniciar</p>
    </div>
  )
}
