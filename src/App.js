import './App.css';
import Frame from './components/frame.js';
import Title from './components/title.js';
import Menu from './components/menu.js';
import Estado from './components/estado.js';
import Dormir from './components/dormir.js';
import Inicio from './components/inicio.js';
import { useState,useEffect } from 'react';

function App() {
  const [hambre, setHambre] = useState(100);
  const [higiene, setHigiene] = useState(100);
  const [energia, setEnergia] = useState(100);
  const [diversion, setDiversion] = useState(100);
  const [items,setItems] = useState([]);
  const [food,setFood] = useState([]);
  const [menuEstancia,setMenuEstancia] = useState("inicio");
  const [selectedFood,setSelectedFood] = useState("");
  const comprar = () => {
  setItems(prevItems => [...prevItems, ...food]);
  setFood([]);
  };

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
      case "menu" :
        return <Estado menuEstancia={menuEstancia} selectedFood={selectedFood} setEnergia={setEnergia} setDiversion={setDiversion} setHambre={setHambre} setHigiene={setHigiene} higiene={higiene} hambre={hambre} diversion={diversion} energia={energia} ></Estado>
      case "dormir" :
        return <Estado menuEstancia={menuEstancia} selectedFood={selectedFood} setEnergia={setEnergia} setDiversion={setDiversion} setHambre={setHambre} setHigiene={setHigiene} higiene={higiene} hambre={hambre} diversion={diversion} energia={energia} ></Estado>
      default : 
      return;
    }
  }
  const renderInicio = () =>{
    switch(menuEstancia){
      case "inicio" :
        return (<div className="App">
      {renderMenuSecundario()}
      <div className="tamagotchi">
        <Title home={home}></Title>
        <Inicio></Inicio>
        <Menu setEnergia={setEnergia} energia={energia} items={items} setItems={setItems} food={food} setFood={setFood} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia} showFood={showFood}></Menu>
      </div>
    </div>);
      default : 
      return (
    <div className="App">
      {renderMenuSecundario()}
      <div className="tamagotchi">
        <Title home={home}></Title>
        <Frame></Frame>
        <Menu setEnergia={setEnergia} energia={energia} items={items} setItems={setItems} food={food} setFood={setFood} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia} showFood={showFood}></Menu>
      </div>
    </div>
  );
    }
  }
  return renderInicio();
}

export default App;
