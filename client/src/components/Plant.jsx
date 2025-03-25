import React from 'react'
import { getStyle, getTemperatureHeight, getBackgroundColor, water } from './functions/plantFunctions'

function Plant({name, color, data}) {
  return (
    (data && 
      <div className={`w-[85%] md:w-[350px] flex flex-col gap-2 text font-semibold italic text-${color}`}>
        <div className="w-full h-12 bg-secondary flex justify-center items-center rounded-md">
          <h2 className="italic text-2xl">{name}</h2>
        </div>
        <div className="h-[270px] flex justify-center gap-5">
          <div className="bg-secondary h-full w-[42.5%] rounded-md flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <h2 className="text-xl">Temperatura</h2>
              <h2 className="not-italic text-3xl">{data.temperatura}°C</h2>
            </div>
            <div style={{backgroundColor: getBackgroundColor(color)}} className="h-[70%] w-2/3 mb-2 flex items-end rounded-md">
              <div style={getStyle(getTemperatureHeight(data.temperatura), color)} />
            </div>
          </div>
          <div className="bg-secondary h-full w-[42.5%] rounded-md flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <h2 className="text-xl">Vlažnost</h2>
              <h2 className="not-italic text-3xl">{data.vlaznost}%</h2>
            </div>
            <div style={{backgroundColor: getBackgroundColor(color)}} className="h-[70%] w-2/3 mb-2 flex items-end rounded-md">
              <div style={getStyle(data.vlaznost, color)} />
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className='w-2/5 bg-slate-900 text-4xl font-semibold text-white p-2 rounded-xl text-center cursor-pointer hover:bg-slate-800 duration-500' onClick={water}>Zalij</div>
        </div>
      </div>
    )
    
  );
}

export default Plant;