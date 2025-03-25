import React, { useState } from 'react'
import db from '../api/backend'

function LogIn() {
  const [mac, setMac] = useState('');
  const [err, setErr] = useState('')

  function submit() {
    const getCookie = async () => {
      try {
        console.log(mac.length)
        if(mac.length === 17){
          await db.post('/update-mac', {"mac": mac})
          window.location.reload();
        } else {
          setErr('Niste dobro uneli MAC adresu vašeg uredjaja!')
        }
      } catch (err) {
        console.log(err)
      }
    }
    getCookie();
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className="md:h-1/4 h-1/2 2xl:w-2/4 w-5/6 bg-secondary rounded-2xl flex flex-col justify-center items-center" >
        <h1 className='text-3xl mx-5 mb-6'>Unesite MAC adresu uredjaja:</h1>
        <input type="text" className='pl-2 w-2/3 h-12 text-2xl text-black rounded-md mb-4' onChange={(ev) => setMac(ev.target.value)} value={mac} onKeyDown={e => { if(e.key === 'Enter'){submit()} } } />
        <div className='flex flex-col w-full justify-center items-center'>
          <input type="submit" value="Potvrdi" className='md:w-1/4 w-1/2 h-14 bg-slate-900 rounded-lg cursor-pointer text-xl' onClick={submit} />
          {err !== '' && ( <h3 className='text-red-600 text-2xl font-semibold'>{err}</h3> )}
        </div>
      
      </div>      
    </div>
  )
}

export default LogIn
