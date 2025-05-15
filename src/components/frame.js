import { useEffect, useRef, useState } from "react";

function Frame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const sprite = new Image();
    sprite.src = "/PlayerTemplateIdle.png"; // Tu spritesheet en /public

    const frameWidth = 32;
    const frameHeight = 32;
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
        currentFrame * 32, // suponiendo frames de 32x32
        currentRow * 32,
        32,
        32,
        0,
        0,
        128, // escala 4x en ancho
        128  // escala 4x en alto
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
    <div className="frame">
      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        className="canvas"
      />
    </div>
  );
}

export default Frame;
