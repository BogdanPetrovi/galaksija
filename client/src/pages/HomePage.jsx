import React from 'react'
import Plant from '../components/Plant'
import Chart from '../components/Chart'
// import Events from './components/Events'

function HomePage({ latestData, temperature, moisture, time }) {
  return (
    <div className='min-h-screen w-screen flex flex-col mt-5 xl:mt-0 overflow-x-hidden'>
      <div className="w-full flex flex-grow items-center">
        <div className="w-full flex flex-wrap gap-8 justify-center">
          <Plant 
            name='Biljka A'
            color='green'
            data={latestData}
          />
          
          {/* <Plant 
            name='Biljka B'
            color='pink' 
            sensor='B'
            mac='7C-10-C9-20-9F-66'
          />
          <Plant 
            name='Biljka C'
            color='blue' 
            sensor='C'
            mac='7C-10-C9-20-9F-66'
          /> */}

        </div>
      </div>

      <div className="w-full mb-10 p-4">
        <div className="w-full flex flex-wrap-reverse flex-row-reverse md:flex-row md:flex-wrap gap-8 justify-center">

          <Chart 
            header={"Temperatura zemljišta"}
            time={time}
            data0={temperature}
            // data1={[20.3, 20, 19.7, 19.9, 19.7, 19.2, 19.5, 19.7]}
            // data2={[20, 20.1, 19.2, 19.5, 19.7, 20.5, 20, 19.7]}
          /> 

          <Chart 
            header={"Vlažnost zemljišta"}
            time={time}
            data0={moisture}
            // data1={[71, 64, 59, 55, 48, 41, 38, 31]}
            // data2={[56, 50, 42, 34, 24, 18, 88, 81]}
            isMoisture={true}
          />

          {/* <Events /> */}

        </div>
      </div>
    </div>
  )
}

export default HomePage
