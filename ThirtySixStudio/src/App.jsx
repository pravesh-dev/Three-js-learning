import React from 'react'
import Canvas from './canvas';
import data from './data';

function App() {
  return (
    <div className='w-full min-h-screen bg-black text-white'>
      <Canvas startIndex={0} />
      {
        data.map((section, index)=>{
          return <div key={index} className='w-full h-screen bg-red-700 border'>
            
          </div>
        })
      }
    </div>
  )
}

export default App
