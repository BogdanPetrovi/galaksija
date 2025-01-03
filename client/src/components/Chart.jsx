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

function Chart({time, data0, data1, data2, isMoisture}) {
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
    maintainAspectRatio: false
  }
  return (
    <Line options={options} data={data} />
  )
}

export default Chart
