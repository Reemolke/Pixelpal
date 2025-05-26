import { useEffect, useState } from "react";

function RelojEnergia({ energia }) {
  const grados = (energia / 100) * 360;

  return (
    <div style={{
      width: '20%',
      paddingTop: '20%',
      margin: 'auto',
      position: 'relative',
    }}>
      {/* Círculo del reloj */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        borderRadius: '50%',
        border: '2px solid #ccc',
        boxSizing: 'border-box',
      }}>
        {/* Manecilla */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '49.5%',
          width: '1%',
          height: '40%',
          backgroundColor: '#00aaff',
          transformOrigin: '50% 100%',
          transform: `rotate(${grados}deg)`,
          transition: 'transform 0.3s ease-out',
        }} />
        {/* Centro */}
        <div style={{
          position: 'absolute',
          top: '49%',
          left: '49%',
          width: '2%',
          height: '2%',
          backgroundColor: '#333',
          borderRadius: '50%',
        }} />
      </div>
    </div>
  );
}

function Dormir({ setEnergia, energia }) {
  useEffect(() => {
    const intervalo = setInterval(() => {
      setEnergia((prevEnergia) => {
        if (prevEnergia < 100) {
          return prevEnergia + 1;
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
      <RelojEnergia energia={energia} />
    </div>
  );
}

export default Dormir;
