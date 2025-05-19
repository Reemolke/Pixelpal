import React from "react";



function Comida({ items,setItems,food, setFood }) {
  function addToCart(item) {
    setFood([...food, item]);
  }

  return (
  <div className="comida">
    {food.map((item) => (
      <div key={item.id} className="card" onClick={() => addToCart(item)}>
        <h2>{item.name}</h2>
      </div>
    ))}
  </div>
);
}

export default Comida;
