"use client"

import { useState } from 'react';
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}
export default function Home() {
  const [load, setLoad] = useState(false)

  const addressToSlug = (address: string) => {
    const base64Address = btoa(address); // Utilisez btoa pour convertir en base64
    const slug = base64Address.replace(/=/g, ''); // Supprimez les caractères d'espacement
    return slug;
  };

  const Connexion = async () => {
    setLoad(true)
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const comptes = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setLoad(false)
        window.location.href = "/"+addressToSlug(comptes[0])+""
      } catch (err) {
        console.error(err);
        setLoad(false)
      }
    } else {
      console.log('zoba')
      setLoad(false)

    }
  }

  return (
    <main className="w-full h-screen">
      <div className='photo h-screen relative'>
        <div className="w-full h-full flex justify-center items-center bg-black/40">
          <div className='rounded-md w-[400px] -mr-12 backdrop-blur-sm z-10 shadow-md py-10 absolute px-5 bg-white/40'>
            <div className='flex items-center justify-center'>
              <img src="/log.svg" className='h-64 w-auto' />
            </div>
            <div className='w-full grid grid-cols-1'>
              {/* <button type="submit" className='w-full bg-violet-400 py-3 rounded-md text-white text-md font-bold'>Valider</button> */}
              <button className='w-full bg-blue-600 flex items-center justify-center py-3 rounded-md text-white text-md font-bold text-center' onClick={Connexion}>
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        load == true ?
          <div className='bg-black/60 flex items-center justify-center z-20 absolute w-screen h-screen top-0'>
            <iframe src="https://lottie.host/?file=2a8ea8aa-744d-4fb6-8c9c-bd2f4dde6e39/NeMYisbn2s.json"></iframe>
          </div> : ''
      }
    </main>
  )
}
