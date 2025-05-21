import './App.css';
import Frame from './components/frame.js';
import Title from './components/title.js';
import Menu from './components/menu.js';
import { useState } from 'react';

function App() {
  const [items,setItems] = useState([]);
  const [food,setFood] = useState([]);
  const [menuEstancia,setMenuEstancia] = useState("menu");
  const [selectedFood,setSelectedFood] = useState("");
  const comprar = () =>{
    setItems(food);
    setFood([]);
  }
  const home = () =>{
    setMenuEstancia("menu");
    setFood([]);
  }
  const showFood = (comida) =>{
    setSelectedFood(comida);
  }
  const renderMenuSecundario = () =>{
    switch(menuEstancia) {
      case "comida" :
        return <div className='menuSecundario'>
          <div>
          <h1>{selectedFood.name}</h1>
          {selectedFood && (<h2>Nutrición</h2>)}
          <h3>{selectedFood.nutrition}</h3>
          {selectedFood && (<div
            className="barraNutricionRelleno"
            style={{ width: `${selectedFood.nutrition*10}%` }}
          ></div>)}
          </div>
      </div>
      case "tienda" :
      return <div className='menuSecundario'>
        <div className='botonComprar' onClick={comprar}>
        <h3>Comprar</h3>
        </div>
        {food.map((item) => (
        <div key={item.id} className="card">
          <h2>{item.name}x{item.count}</h2>
        </div>
      ))}
      </div>
      default : 
      return;
    }
  }
  return (
    <div className="App">
      {renderMenuSecundario()}
      <div className="tamagotchi">
        <Title home={home}></Title>
        <Frame></Frame>
        <Menu items={items} setItems={setItems} food={food} setFood={setFood} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia} showFood={showFood}></Menu>
      </div>
    </div>
  );
}

export default App;
