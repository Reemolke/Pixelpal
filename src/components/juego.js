import React, { useEffect, useState, useRef } from "react";
import { useBackgroundMusic } from "../App";

const GRAVEDAD = -0.1; // gravedad negativa para bajar
const SALTO_VELOCIDAD = 3; // velocidad positiva para subir
const PISO = 0;

const RunnerGame = ({ spritesheetUrl, framesCount, frameWidth, frameHeight,setDinero,dinero,setDiversion,diversion}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [posY, setPosY] = useState(PISO);
  const [velY, setVelY] = useState(0);
  const [obstaculos, setObstaculos] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const requestRef = useRef();

  const enSuelo = posY <= PISO;

  // Animar spritesheet
  useEffect(() => {
    const anim = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % framesCount);
    }, 120);
    return () => clearInterval(anim);
  }, [framesCount]);

  // Crear obstáculos
  useEffect(() => {
    if (gameOver) return;
    let timeoutId;
    const crearObstaculo = () => {
      setObstaculos((obs) => [...obs, { id: Date.now(), x: 640 }]);
      timeoutId = setTimeout(crearObstaculo, 1000 + Math.random() * 2000);
    };
    crearObstaculo();
    return () => clearTimeout(timeoutId);
  }, [gameOver]);

  function useBackgroundMusic(src, activo, volume = 0.5) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!src || !activo) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;

    audio.play().catch((err) => {
      console.warn("Error al reproducir música:", err);
    });

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [src, activo, volume]);
}

  // Loop juego
  useBackgroundMusic("Static Love.mp3",!gameOver,0.5)
  useEffect(() => {
    if (gameOver) return;
    
    const velocidadObstaculo = 3;
    const personajeWidth = frameWidth-17;
    const personajeHeight = frameHeight;

    const loop = () => {
      setPosY((y) => {
        let nuevaY = y + velY;
        if (nuevaY < PISO) return PISO; // no baja del suelo
        return nuevaY;
      });

      setVelY((v) => {
        if (enSuelo && v < 0) return 0; // si está en suelo y va bajando, parar
        return v + GRAVEDAD; // aplicar gravedad
      });

      setObstaculos((obs) =>
        obs
          .map((o) => ({ ...o, x: o.x - velocidadObstaculo }))
          .filter((o) => o.x + 30 > 0)
      );

      // Colisiones
      for (const o of obstaculos) {
        const obstX = o.x;
        const obstY = PISO;
        const obstW = 15;
        const obstH = 20;

        const persX = 50;
        const persY = posY;

        if (
          persX < obstX + obstW &&
          persX + personajeWidth > obstX &&
          persY < obstY + obstH &&
          persY + personajeHeight > obstY
        ) {
          setGameOver(true);
          playSound("hitHurt.wav")
          setDinero(prev => Number(prev) + Number((score * 0.0001).toFixed(2)));
          if(diversion+10 >= 100){
            setDiversion(100)
          }else{
            setDiversion(diversion+10)
          }
          break;
        }
      }

      setScore((s) => s + 1);

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(requestRef.current);
  }, [velY, posY, obstaculos, gameOver, frameHeight, frameWidth, enSuelo]);

  const playSound = (src) => {
  const audio = new Audio(src);
  audio.play().catch(error => {
    console.error("Error al reproducir el sonido:", error);
  });
}
  // Control salto teclado
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Space" && enSuelo && !gameOver) {
        setVelY(SALTO_VELOCIDAD);
        playSound("jump.wav")
      }
      if (e.code === "Enter" && gameOver) {
        setGameOver(false);
        setScore(0);
        setObstaculos([]);
        setPosY(PISO);
        setVelY(0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enSuelo, gameOver]);

  // Salto click
  const onClick = () => {
    if (!gameOver && enSuelo) {
      setVelY(SALTO_VELOCIDAD);
    }
    if (gameOver) {
      setGameOver(false);
      setScore(0);
      
      setObstaculos([]);
      setPosY(PISO);
      setVelY(0);
    }
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: 20, cursor: "pointer", userSelect: "none",width: "100%" }}
      onClick={onClick}
    >
      <div
        style={{
          position: "relative",
          width: '80%',
          height: frameHeight + 100,
          margin: "0 auto",
          backgroundImage: `url(/background.gif)`,
          backgroundSize: "contain",
          backgroundRepeat:"repeat-x",
          overflow: "hidden",
          border: "2px solid #333",
          borderRadius: 8,
        }}
      >
        {/* Personaje */}
        <div
          style={{
            position: "absolute",
            left: 50,
            bottom: posY,
            width: frameWidth,
            height: frameHeight,
            backgroundImage: `url(${spritesheetUrl})`,
            backgroundPosition: `-${frameIndex * frameWidth}px 0px`,
            imageRendering: "pixelated",
          }}
        />

        {/* Obstáculos */}
        {obstaculos.map((o) => (
          <div
            key={o.id}
            style={{
              position: "absolute",
              bottom: 0,
              left: o.x,
              width: 30,
              height: 40,
              backgroundImage: `url(/box.png)`,
              backgroundRepeat: "no-repeat",
              borderRadius: 4,
            }}
          />
        ))}
      </div>

      <h2>Puntuación: {Math.floor(score / 20)}</h2>
      <h2 style={{color: "green"}}>Dinero: {dinero.toFixed(3)}</h2>
      {gameOver && (
        <div style={{ marginTop: 20, color: "red", fontWeight: "bold" }}>
          Game Over - Presiona Enter o Click aquí para reiniciar
        </div>
      )}
      <div style={{ fontSize: 12, marginTop: 8, color: "#666" }}>Usa espacio o click aquí</div>
    </div>
  );
};

export default function Juego({ juego,setDinero,dinero,setDiversion,diversion }) {
  const spritesheetUrl = "/RMO_running.png"; // Cambia a tu ruta real
  const framesCount = 6;
  const frameWidth = 64;
  const frameHeight = 64;

  if (juego === "runner") {
    return (
      <RunnerGame
        spritesheetUrl={spritesheetUrl}
        framesCount={framesCount}
        frameWidth={frameWidth}
        frameHeight={frameHeight}
        setDinero={setDinero}
        dinero={dinero}
        setDiversion={setDiversion}
        diversion={diversion}
      />
    );
  }

  return <div>No hay juego seleccionado</div>;
}
