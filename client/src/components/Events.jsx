import React from 'react'

function Events() {
  return (
    <div className="w-[85%] md:w-[35%] lg:w-[25%] xl:w-[20%] 2xl:w-[15%] h-[370px] bg-secondary p-3 pb-[2.5rem]">
      <h2 className='font-semibold italic text-2xl mb-2'>Dogadjaji</h2>
      <table className='table-auto h-5/6 divide-y-2 mx-auto'>
        <thead>
          <tr>
            <th className='font-semibold text-xl'>Vreme</th>
            <th className='font-semibold text-xl'>Biljka</th>
            <th className='font-semibold text-xl'>Poruka</th>
          </tr>
        </thead>
        <tbody className='divide-y-2'>
          <tr className='h-[25%]'>
            <td className='w-1/3 text-center'>10:53</td>
            <td className='w-1/3 text-center'>C</td>
            <td className='w-1/3 text-center'>Automatsko zalivanje</td>
          </tr>
          <tr className='h-[25%]'>
            <td className='w-1/3 text-center'>10:33</td>
            <td className='w-1/3 text-center'>A</td>
            <td className='w-1/3 text-center'>Automatsko zalivanje</td>
          </tr>
          <tr className='h-[25%]'>
            <td className='w-1/3 text-center'>10:22</td>
            <td className='w-1/3 text-center'>B</td>
            <td className='w-1/3 text-center'>Manuelno zalivanje</td>
          </tr>
          <tr className='h-[25%]'>
            <td className='w-1/3 text-center'>10:04</td>
            <td className='w-1/3 text-center'>A</td>
            <td className='w-1/3 text-center'>Manuelno zalivanje</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Events
