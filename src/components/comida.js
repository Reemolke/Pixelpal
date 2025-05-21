import React from "react";



function Comida({ items,setItems,food, setFood,showFood}) {
  function addToCart(item) {
    setFood([...food, item]);
  }

  return (
  <div className="comida">
    {items.map((item) => (
      <div key={item.id} className="card" onClick={() =>showFood(item)}>
        <h2>{item.name}</h2>
        <p>x{item.count}</p>
      </div>
    ))}
  </div>
);
}

export default Comida;
