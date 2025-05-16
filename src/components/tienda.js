import React from "react";

const availableItems = [
  { id: 1, name: "Pan", price: 1 },
  { id: 2, name: "Queso", price: 3 },
  { id: 3, name: "Manzana", price: 1 },
  { id: 4, name: "Leche", price: 2 },
  { id: 5, name: "Huevos", price: 2 },
];

function Tienda({ food, setFood }) {
  function addToCart(item) {
    setFood([...food, item]);
  }

  return (
    <div className="tienda">
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
