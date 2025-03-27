import React, { useEffect, useState } from 'react'
import './index.css'
import getData from './components/functions/getData'
import mapFunction from './components/functions/mapFunction'
import db from './api/backend'
import LoadingPage from './pages/LoadingPage'
import HomePage from './pages/HomePage'
import LogIn from './pages/LogIn'
import clear from './components/functions/clearCookie'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [latestData, setLatestData] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [moisture, setMoisture] = useState([]);
  const [time, setTime] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mac = await db.get('/get-mac')
        if(mac.data.mac){
          setIsLoggedIn(true)
          const result = await getData("B", mac.data.mac);
          setLatestData(result.data.data[0]);
          const temperatures = mapFunction(result.data.data, "temperatura", false, false)
          setTemperature(temperatures)
          const moistures = mapFunction(result.data.data, "vlaznost", false, true)
          setMoisture(moistures)
          const times = mapFunction(result.data.data, "vreme", true, false)
          setTime(times)
        }
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }

    fetchData();
  }, [])

  if(isLoading){
    return <LoadingPage />
  }

  if(!isLoggedIn){
    return <LogIn />
  }

  if(!isLoading && temperature.length > 0) {
    return (
      <HomePage
        latestData={latestData}
        temperature={temperature}
        moisture={moisture}
        time={time}
      />
    )
  }

  return(
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
      <h2 className='font-semibold text-2xl w-fit text-red-100'>Ne postoje informacije sa ove adrese uredjaja. Proverite da li ste dobro uneli adresu ili da li ste dobro povezali uredjaj.</h2>
      <div className='md:w-1/6 w-1/2 bg-slate-900 text-4xl font-semibold text-white p-2 rounded-xl text-center cursor-pointer select-none hover:bg-slate-800 duration-500' onClick={clear}>Uloguj se opet</div>
    </div>
  )
}

export default App