import React from 'react'

function Plant({name, color, latestInfo}) {

  const getStyle = (percentage) => ({
    height: `${percentage}%`,
    width: '100%',
    borderRadius: '0.375rem',
    backgroundColor: color === 'green' ? '#046A1D' : 
                    color === 'blue' ? '#3E80FC' : 
                    '#CB1BAB'
  });
  
  const getBackgroundColor = () => (
    color === 'green' ? '#01370E' :
    color === 'blue' ? '#263E6A' :
    '#782068'
  );

  return (
    <div className={`w-[85%] md:w-[350px] flex flex-col gap-2 text font-semibold italic text-${color}`}>
      <div className="w-full h-12 bg-secondary flex justify-center items-center rounded-md">
        <h2 className="italic text-2xl">{name}</h2>
      </div>
      <div className="h-[270px] flex justify-center gap-5">
        <div className="bg-secondary h-full w-[42.5%] rounded-md flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <h2 className="text-xl">Temperatura</h2>
            <h2 className="not-italic text-3xl">{latestInfo.temperatura}°C</h2>
          </div>
          <div style={{backgroundColor: getBackgroundColor()}} className="h-[70%] w-2/3 mb-2 flex items-end rounded-md">
            <div style={getStyle("60")} />
          </div>
        </div>
        <div className="bg-secondary h-full w-[42.5%] rounded-md flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <h2 className="text-xl">Vlaznost</h2>
            <h2 className="not-italic text-3xl">{latestInfo.vlaznost}%</h2>
          </div>
          <div style={{backgroundColor: getBackgroundColor()}} className="h-[70%] w-2/3 mb-2 flex items-end rounded-md">
            <div style={getStyle(latestInfo.vlaznost)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plant