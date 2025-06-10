import React from "react";



function Comida({ items,setItems,food, setFood,showFood}) {
  function addToCart(item) {
    setFood([...food, item]);
  }
  const groupedItems = items.reduce((acc, item) => {
  const key = item.name;
  if (!acc[key]) {
    acc[key] = { ...item }; // Copiamos el objeto original
  } else {
    acc[key].count += item.count; // Sumamos el count existente
  }
  return acc;
}, {});
  return (
  <div className="comida">
    {Object.values(groupedItems).map((item) => (
      <div style={{fontSize: "1vw",width:"100%",padding: "5px"}} key={item.name} className="card" onClick={() => showFood(item)}>
        <h2>{item.name}</h2>
        <p>x{item.count}</p>
      </div>
    ))}
  </div>
);

}

export default Comida;
