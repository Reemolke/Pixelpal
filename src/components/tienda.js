import React, { use, useState,useEffect,useRef } from "react";
import Menu from "./menu.js";
const availableItems = [
  { id: 0, name: "🍞", price: 1 ,count:0,nutrition: 2},
  { id: 1, name: "🧀", price: 3 ,count:0,nutrition: 5},
  { id: 2, name: "🍎", price: 0.8,count:0,nutrition: 3 },
  { id: 3, name: "🥛", price: 2,count:0, nutrition: 2 },
  { id: 4, name: "🥚", price: 2,count:0,nutrition: 6 },
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
      <div key={item.id} className="card" onClick={() => agregarComida(item)}>
        <h2>{item.name}</h2>
        <p>{item.price.toFixed(2)}€</p>
      </div>
    ))}
    
  </div>
  
);

}

export default Tienda;
