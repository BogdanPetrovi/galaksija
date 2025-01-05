import React from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js'
import { Line } from "react-chartjs-2"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
)

function Chart({header, time, data0, data1, data2, isMoisture}) {
  const data = {
    labels: time,
    datasets: [
      {
        label: "Biljka A",
        data: data0,
        backgroundColor: '#046A1D',
        borderColor: '#046A1D'
      },
      {
        label: "Biljka B",
        data: data1,
        backgroundColor: '#CB1BAB',
        borderColor: '#CB1BAB'
      },
      {
        label: "Biljka C",
        data: data2,
        backgroundColor: '#3E80FC', 
        borderColor: '#3E80FC'
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        ...(isMoisture && { min:0, max:100 })
      }
    },
    maintainAspectRatio: false,
  }
  return (
    <div className="w-[85%] md:w-[45%] lg:w-[35%] xl:w-[25%] h-[370px] bg-secondary p-3 pb-[2.5rem]">
      <h2 className='font-semibold italic text-2xl mb-2'>{header}</h2>
      <div className='h-[300px]'>
        <Line options={options} data={data} height={"100%"} width={"100%"} />
      </div>
    </div>
  )
}

export default Chart
