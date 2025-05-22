import { useState,useEffect } from 'react';

function Estado({selectedFood,menuEstancia,setHigiene,higiene,setEnergia,energia,setHambre,hambre,setDiversion,diversion}){
    useEffect(() => {
  const interval = setInterval(() => {
    setHambre(prev => Math.max(prev - 0.00231, 0));
    setHigiene(prev => Math.max(prev - 0.00231, 0));
    setEnergia(prev => Math.max(prev - 0.00231, 0));
    setDiversion(prev => Math.max(prev - 0.00231, 0));
  }, 1000); // cada segundo

  return () => clearInterval(interval); // limpia el intervalo si el componente se desmonta
}, []);
    const contenido = () =>{
        switch (menuEstancia) {
            case "menu" :
                return (<div className="menuSecundario">
                    <div className='valorDiv'>
                        <p>☺️</p><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${diversion}%` }}></div></div>
                    </div>
                    <div className='valorDiv'>
                        <p>🍔</p><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${hambre}%` }}></div></div>
                    </div>
                    <div className='valorDiv'>
                        <p>⚡️</p><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${energia}%` }}></div></div>
                    </div>
                    <div className='valorDiv'>
                        <p>🧼</p><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${higiene}%` }}></div></div>
                    </div>
                </div>)
                default :
                return (<div className="menuSecundario">
                    <h1>{higiene}</h1>
                </div>)
        }
    }
    return contenido()
}

export default Estado;