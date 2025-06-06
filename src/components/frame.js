import { useEffect, useRef, useState } from "react";

function Frame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const sprite = new Image();
    sprite.src = "/RMO.png"; // Tu spritesheet en /public

    const frameWidth = 640;
    const frameHeight = 640;
    const columns = 4; // Frames por fila
    const rows = 4;    // Número de filas (acciones distintas)
    const currentRow = 0; // ← cambia esto para probar otras filas

    const totalFrames = columns;
    let currentFrame = 0;

    let animationFrameId;
    let lastFrameTime = 0;
    const fps = 6;
    const frameDuration = 1000 / fps;

    const render = (timestamp) => {
      if (timestamp - lastFrameTime >= frameDuration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
        sprite,
        currentFrame * 640, // suponiendo frames de 32x32
        currentRow * 640,
        640,
        640,
        0,
        0,
        2560, // escala 4x en ancho
        2560  // escala 4x en alto
        );


        currentFrame = (currentFrame + 1) % totalFrames;
        lastFrameTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    sprite.onload = () => {
      requestAnimationFrame(render);
    };

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="frame" style={{ 
      display: "flex", 
      justifyContent: "center", 
      width: "100%",height: "80%"
    }}>
      <canvas 
        ref={canvasRef}
        width={2560}
        height={2560}
        className="canvas"
        style={{marginLeft: "auto",marginRight: "auto",width: "72%",    // escala visual
        height: "100%"}}
      />
    </div>
  );
}

export default Frame;
