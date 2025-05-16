import React from "react";

const availableItems = [
  { id: 1, name: "🍞", price: 1.5 },
  { id: 2, name: "🧀", price: 3.2 },
  { id: 3, name: "🍎", price: 0.8 },
  { id: 4, name: "🥛", price: 2.0 },
  { id: 5, name: "🥚", price: 2.5 },
];

function Tienda({ food, setFood }) {
  function addToCart(item) {
    setFood([...food, item]);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {availableItems.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl shadow-md p-6 flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
          <p className="text-gray-600 mb-4">Precio: €{item.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(item)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tienda;
