import { useEffect, useState } from "react";

function Dormir({ setEnergia, energia }) {
  useEffect(() => {
    const intervalo = setInterval(() => {
      setEnergia((prevEnergia) => {
        if (prevEnergia < 100) {
          return prevEnergia + 0.2;
        } else {
          clearInterval(intervalo);
          return prevEnergia;
        }
      });
    }, 1000); // Aumenta cada 1 segundo

    return () => clearInterval(intervalo);
  }, [setEnergia]);

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div className='valorDiv' style={{margin:"auto", display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <img src="energia.png"/><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${energia}%` }}></div></div>
                    </div>
    </div>
  );
}

export default Dormir;
