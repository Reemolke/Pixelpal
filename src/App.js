import './App.css';
import Frame from './components/frame.js';
import Title from './components/title.js';
import Menu from './components/menu.js';
import { useState } from 'react';

function App() {
  const [items,setItems] = useState([]);
  const [food,setFood] = useState([]);
  return (
    <div className="App">
      <div className="tamagotchi">
        <Title></Title>
      <Frame></Frame>
      <Menu items={items} setItems={setItems} food={food} setFood={setFood}></Menu>
      </div>
    </div>
  );
}

export default App;
