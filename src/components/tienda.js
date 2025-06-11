import React, { use, useState,useEffect,useRef } from "react";
import Menu from "./menu.js";
const availableItems = [
  { id: 0, name: "pan.png", price: 1 ,count:0,nutrition: 3},
  { id: 1, name: "queso.png", price: 2 ,count:0,nutrition: 5},
  { id: 2, name: "manzana.png", price: 0.8,count:0,nutrition: 2 },
  { id: 3, name: "leche.png", price: 1.5,count:0, nutrition: 4 },
  { id: 4, name: "hamburguesa.png", price: 4,count:0,nutrition: 9 },
];

function Tienda({ items,setItems,food, setFood }) {
  const tiendaRef = useRef(null);

  useEffect(() => {
    const tienda = tiendaRef.current;
    if (!tienda) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        tienda.scrollLeft += e.deltaY;
      }
    };

    tienda.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      tienda.removeEventListener('wheel', handleWheel);
    };
  }, []);
  const agregarComida = (comida) => {
    setFood(prevFood => {
      const index = prevFood.findIndex(item => item.id === comida.id);
      if (index !== -1) {
        const updatedFood = [...prevFood];
        updatedFood[index] = {
          ...updatedFood[index],
          count: updatedFood[index].count + 1
        };
        return updatedFood;
      } else {
        return [...prevFood, { ...comida, count: 1 }];
      }
    });
  };
  const [estancia,setEstancia] = useState('tienda');
const [contenido,setContenido] = useState("");
  function addToCart(item) {
    setFood([...food, item]);
  }
  
  return (
  <div className="tienda" ref={tiendaRef}>
    {availableItems.map((item) => (
      <div style={{display: "flex",justifyContent: "center",alignItems:"center"}} key={item.id} className="card" onClick={() => agregarComida(item)}>
        <img src={item.name}></img>
        <p style={{margin: "0"}}>{item.price.toFixed(2)}€</p>
      </div>
    ))}
    
  </div>
  
);

}

export default Tienda;
