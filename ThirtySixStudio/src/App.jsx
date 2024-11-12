import React, { useEffect } from 'react'
import Canvas from './canvas';
import data from './data';
import LocomotiveScroll from 'locomotive-scroll';



function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, [])
  
  return (
    <div className='w-full min-h-screen bg-black text-white'>
      {
        data.map((section, index)=>{
          return <div key={index} className='w-full min-h-screen border relative overflow-hidden'>
            {
              section.map((canvasItem, idx)=>{
                return (
                    <Canvas key={idx} details={canvasItem} />
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
