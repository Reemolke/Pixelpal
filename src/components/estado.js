import { useState,useEffect } from 'react';



function Estado({dinero,selectedFood,menuEstancia,setHigiene,higiene,setEnergia,energia,setHambre,hambre,setDiversion,diversion,user}){
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
                    <img src={user.photoURL} style={{border: "3px solid black",borderRadius: "5%",margin: "auto"}}></img>
                    <p>${dinero.toFixed(3)}</p>
                    <div className='valorDiv'>
                        <p>☺️</p><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${diversion}%` }}></div></div>
                    </div>
                    <div className='valorDiv'>
                        <p>🍔</p><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${hambre}%` }}></div></div>
                    </div>
                    <div className='valorDiv'>
                        <p>⚡️</p><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${energia}%` }}></div></div>
                    </div>
                </div>)
                default :
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
                </div>)
        }
    }
    return contenido()
}

export default Estado;