import React from 'react'
import './index.css'
import Plant from './components/Plant'
import Chart from './components/Chart'
import Events from './components/Events'

function App() {
  return (
    <div className='min-h-screen w-screen flex flex-col mt-5 xl:mt-0 overflow-x-hidden'>
      <div className="w-full flex flex-grow items-center">
        <div className="w-full flex flex-wrap gap-8 justify-center">
          <Plant 
            name={'Biljka A'}
            color={'green'} 
            temperature={'18.5'}
            temperaturePrecent={'65'}
            soilMoisture={'35.2'}
          />
          <Plant 
            name={'Biljka B'}
            color={'pink'} 
            temperature={'20'}
            temperaturePrecent={'70'}
            soilMoisture={'60'}
          />
          <Plant 
            name={'Biljka C'}
            color={'blue'} 
            temperature={'15.6'}
            temperaturePrecent={'55'}
            soilMoisture={'52.2'}
          />
        </div>
      </div>

      <div className="w-full mb-10 p-4">
        <div className="w-full flex flex-wrap-reverse flex-row-reverse md:flex-row md:flex-wrap gap-8 justify-center">

          <Chart 
            header={"Temperatura zemljista"}
            time={["10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05"]}
            data0={[16, 16.1, 17.2, 17.5, 17.7, 17.2, 17, 16.7]}
            data1={[20.3, 20, 19.7, 19.9, 19.7, 19.2, 19.5, 19.7]}
            data2={[20, 20.1, 19.2, 19.5, 19.7, 20.5, 20, 19.7]}
          />

          <Chart 
            header={"Vlaznost zemljista"}
            time={["10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05"]}
            data0={[14 , 88, 72, 66, 59, 51, 44, 38]}
            data1={[71, 64, 59, 55, 48, 41, 38, 31]}
            data2={[56, 50, 42, 34, 24, 18, 88, 81]}
            isMoisture={true}
          />

          <Events />

        </div>
      </div>

    </div>
  )
}

export default App