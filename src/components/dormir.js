import { useEffect, useState } from "react";

function Dormir({ setEnergia, energia }) {
  useEffect(() => {
    const intervalo = setInterval(() => {
      setEnergia((prevEnergia) => {
        if (prevEnergia < 100) {
          return prevEnergia + 10;
        } else {
          clearInterval(intervalo);
          return prevEnergia;
        }
      });
    }, 1000); // aumenta cada 1 segundo

    return () => clearInterval(intervalo); // limpiar al desmontar
  }, [setEnergia]);

  return (
    <div>
      <p>Durmiendo... Energía actual: {energia}</p>
    </div>
  );
}

export default Dormir;
