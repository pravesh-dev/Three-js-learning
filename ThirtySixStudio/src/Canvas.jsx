import React, { useEffect, useRef } from 'react'
import canvasimages from './canvasimages'

function canvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = canvasimages[0];
      img.onload = () =>{
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0)
      };
    }, [])
    
  return (
    <canvas ref={canvasRef} className='w-52 h-52' id='canvas'></canvas>
  )
}

export default canvas
