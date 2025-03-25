import React, { useEffect, useState } from 'react'
import './index.css'
import getData from './components/functions/getData'
import mapFunction from './components/functions/mapFunction'
import db from './api/backend'
import LoadingPage from './pages/LoadingPage'
import HomePage from './pages/HomePage'
import LogIn from './pages/LogIn'

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
          const temperatures = mapFunction(result.data.data, "temperatura")
          setTemperature(temperatures)
          const moistures = mapFunction(result.data.data, "vlaznost")
          setMoisture(moistures)
          const times = mapFunction(result.data.data, "vreme", true)
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

  return (
    <HomePage
      latestData={latestData}
      temperature={temperature}
      moisture={moisture}
      time={time}
    />
  )
}

export default App