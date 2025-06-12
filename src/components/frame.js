import { useEffect, useRef } from "react";
import Juego from "./juego";

function Frame({ setMenuEstancia, menuEstancia,dinero,setDinero,setDiversion,diversion,hambre,energia }) {
  const canvasRef = useRef(null);
  const felicidad = diversion+hambre+energia
const animConfigs = {
  menu: { spriteSrc: "/RMO.png", currentRow: 0, totalFrames: 4, loop: true },
  comer: { spriteSrc: "/RMO_eating.png", currentRow: 0, totalFrames: 6, loop: false },
  dormir: { spriteSrc: "/RMO_charging.png", currentRow: 0, totalFrames: 7, loop: true },// No loop
  default: { spriteSrc: "/RMO.png", currentRow: 0, totalFrames: 4, loop: true },
};
if(felicidad < 100){
  animConfigs.menu.spriteSrc = "/RMO_sad.png";
  animConfigs.menu.totalFrames = 1;
  animConfigs.menu.loop= false; // <- cambia el sprite de `menu`
} else {
  animConfigs.menu.spriteSrc = "/RMO.png";
  animConfigs.menu.totalFrames = 4;
  animConfigs.menu.loop= true; // <- valor normal
}

 useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const { spriteSrc, currentRow, totalFrames,loop } = animConfigs[menuEstancia] || animConfigs.default;

  const sprite = new Image();
  sprite.src = spriteSrc;

  const frameWidth = 640;
  const frameHeight = 640;

  let currentFrame = 0;
  let lastFrameTime = 0;
  const fps = 6;
  const frameDuration = 1000 / fps;

  let animationFrameId;
  let isActive = true;

  const render = (timestamp) => {
  if (!isActive) return;

  if (!lastFrameTime) lastFrameTime = timestamp;

  if (timestamp - lastFrameTime >= frameDuration) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      sprite,
      currentFrame * frameWidth,
      currentRow * frameHeight,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth * 4,
      frameHeight * 4
    );

    if (loop) {
      currentFrame = (currentFrame + 1) % totalFrames;
    } else {
      if (currentFrame < totalFrames - 1) {
        currentFrame++;
      }
      // si ya está en el último frame no avanza más
    }
    lastFrameTime = timestamp;
  }

  animationFrameId = requestAnimationFrame(render);
};


  sprite.onload = () => {
    currentFrame = 0;
    lastFrameTime = 0;
    if (isActive) animationFrameId = requestAnimationFrame(render);
  };

  return () => {
    isActive = false;
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}, [menuEstancia]);


 // vuelve a ejecutarse cuando cambia menuEstancia

  const renderContenido = () => {
    console.log("menuEstancia:", menuEstancia);
    switch (menuEstancia) {
      case "juego":
        return (
          <div
            className="frame"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "80%",
            }}
          >
            <Juego juego="runner" dinero={dinero} setDinero={setDinero} setDiversion={setDiversion} diversion={diversion}></Juego>
          </div>
        );
      default:
        return (
          <div
            className="frame"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "80%",
            }}
          >
            <canvas
              ref={canvasRef}
              width={2560}
              height={2560}
              className="canvas"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "72%",
                height: "100%",
              }}
            />
          </div>
        );
    }
  };

  return renderContenido();
}

export default Frame;
