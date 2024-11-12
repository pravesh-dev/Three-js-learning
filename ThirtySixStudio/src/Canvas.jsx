import React, { useEffect, useRef, useState } from 'react'
import canvasimages from './canvasimages'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

function canvas({details}) {
    const canvasRef = useRef(null);
    const { startIndex, numImages, duration, size, top, left, zIndex } = details
    const [index, setIndex] = useState({value: startIndex});

    useGSAP(()=>{
        gsap.to(index, {
            value: startIndex + 149,
            repeat: -1,
            duration: 3,
            ease: 'linear',
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) })
            }
        })
    })

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = canvasimages[index.value];
      img.onload = () =>{
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0)
      };
    }, [index])
    
  return (
    <canvas ref={canvasRef} className='w-52 h-52' id='canvas'></canvas>
  )
}

export default canvas
