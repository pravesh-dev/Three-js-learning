import React, { useEffect, useRef, useState } from "react";
import canvasimages from "./canvasimages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function canvas({ details }) {
  const canvasRef = useRef(null);
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setIndex] = useState({ value: startIndex });

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      repeat: -1,
      duration: duration,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });

    gsap.to(canvasRef.current, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = canvasimages[index.value];
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [index]);

  return (
    <canvas
    data-scroll
    data-scroll-speed={0.1}
      ref={canvasRef}
      style={{
        width: `${size * 1.2}px`,
        height: `${size * 1.2}px`,
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        zIndex: zIndex,
      }}
      id="canvas"
    ></canvas>
  );
}

export default canvas;
