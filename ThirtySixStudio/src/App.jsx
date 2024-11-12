import React from 'react'
import Canvas from './canvas';
import data from './data';

function App() {
  return (
    <div className='w-full min-h-screen bg-black text-white'>
      {
        data.map((section, index)=>{
          return <div key={index} className='w-full h-screen bg-red-700 border'>
            {
              section.map((canvasItem, idx)=>{
                return (
                  <div key={idx}>
                    <Canvas details={canvasItem} />
                  </div>
                )
              })
            }
          </div>
        })
      }
    </div>
  )
}

export default App
