import React from 'react'
import './index.css'
import Plant from './components/Plant'

function App() {
  return (
    <div className='h-screen w-screen'>
      <div className="w-full h-1/2">
        <div className="w-fit h-full mx-auto flex flex-wrap gap-20 justify-center items-end">
          <Plant 
            name={'Biljka A'}
            color={'green'} 
            temperature={'18.5'}
            temperaturePrecent={'65'}
            soilMoisture={'35.2'}
            />
          <Plant 
            name={'Biljka B'}
            color={'blue'} 
            temperature={'20'}
            temperaturePrecent={'70'}
            soilMoisture={'60'}
            />
          <Plant 
            name={'Biljka C'}
            color={'pink'} 
            temperature={'15.6'}
            temperaturePrecent={'55'}
            soilMoisture={'52.2'}
            />
        </div>
      </div>
    </div>
  )
}

export default App