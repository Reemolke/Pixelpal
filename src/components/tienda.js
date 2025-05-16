import React from "react";

const availableItems = [
  { id: 1, name: "🍞", price: 1 },
  { id: 2, name: "🧀", price: 3 },
  { id: 3, name: "🍎", price: 0 },
  { id: 4, name: "🥛", price: 2 },
  { id: 5, name: "🥚", price: 2 },
];

function Tienda({ food, setFood }) {
  function addToCart(item) {
    setFood([...food, item]);
  }

  return (
  <div className="tienda">
    {availableItems.map((item) => (
      <div key={item.id} className="card" onClick={() => addToCart(item)}>
        <h2>{item.name}</h2>
        <p>{item.price.toFixed(2)}€</p>
      </div>
    ))}
  </div>
);

}

export default Tienda;
