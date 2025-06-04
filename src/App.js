import './App.css';
import Frame from './components/frame.js';
import Title from './components/title.js';
import Menu from './components/menu.js';
import Estado from './components/estado.js';
import Dormir from './components/dormir.js';
import Inicio from './components/inicio.js';
import { useState,useEffect } from 'react';
import { doc, setDoc,getDoc } from "firebase/firestore";
import {db} from "./firebase";

function App() {
  const [hambre, setHambre] = useState(100);
  const [higiene, setHigiene] = useState(100);
  const [energia, setEnergia] = useState(100);
  const [diversion, setDiversion] = useState(100);
  const [items,setItems] = useState([]);
  const [food,setFood] = useState([]);
  const [menuEstancia,setMenuEstancia] = useState("inicio");
  const [selectedFood,setSelectedFood] = useState("");
  const [user, setUser] = useState(null);
  const comprar = () => {
  setItems(prevItems => [...prevItems, ...food]);
  setFood([]);
  };
  useEffect(() => {
  if (user && items.length > 0) {
    console.log("Guardando en Firebase", user.id, items);

    const saveItemsToFirebase = async () => {
      try {
        const userRef = doc(db, "inventarios", user.uid); // o user.uid
        await setDoc(userRef, { items }, { merge: true });
        console.log("Inventario guardado en Firebase.");
      } catch (error) {
        console.error("Error al guardar en Firebase:", error);
      }
    };

    saveItemsToFirebase();
  }
}, [items, user]);

const cargarInventario = async (user, setItems) => {
  try {
    const userRef = doc(db, "inventarios", user.uid); // usamos uid
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setItems(data.items || []);
      console.log("Inventario cargado:", data.items);
    } else {
      console.log("No existe inventario para este usuario.");
      setItems([]); // por si es nuevo
    }
  } catch (error) {
    console.error("Error al cargar inventario:", error);
  }
};
useEffect(() => {
  if (user) {
    cargarInventario(user, setItems);
  }
}, [user]);

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
        return <div className='menuSecundario' style={{alignItems: "center"}}>
          <div style={{backgroundColor: "aliceblue",border: "3px solid black", borderRadius: "5%"}}>
          <h1>{selectedFood.name}</h1>
          {selectedFood && (<h2>Nutrición</h2>)}
          <h3>{selectedFood.nutrition}</h3>
          {selectedFood && (<div style={{display: "flex",flexDirection: "row"}}><div
            className="barraNutricionRelleno"
            style={{ width: `${hambre}%` }}
          ></div><div className="barraNutricionRelleno" style={{ width: `${selectedFood.nutrition*10}%` }}></div></div>)}
          </div>
          <div className='card'>Comer</div>
      </div>
      case "tienda" :
      return <div className='menuSecundario'>
        
        {food.map((item) => (
        <div key={item.id} className="card">
          <h2>{item.name}x{item.count}</h2>
        </div>
        
      ))}
      <div className='botonComprar' onClick={comprar}>
        <h3>Comprar</h3>
        </div>
      </div>
      case "menu" :
        return <Estado user={user} menuEstancia={menuEstancia} selectedFood={selectedFood} setEnergia={setEnergia} setDiversion={setDiversion} setHambre={setHambre} setHigiene={setHigiene} higiene={higiene} hambre={hambre} diversion={diversion} energia={energia} ></Estado>
      case "dormir" :
        return <Estado menuEstancia={menuEstancia} selectedFood={selectedFood} setEnergia={setEnergia} setDiversion={setDiversion} setHambre={setHambre} setHigiene={setHigiene} higiene={higiene} hambre={hambre} diversion={diversion} energia={energia} ></Estado>
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
        <Menu user={user} setUser={setUser} setEnergia={setEnergia} energia={energia} items={items} setItems={setItems} food={food} setFood={setFood} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia} showFood={showFood}></Menu>
      </div>
    </div>
  );
}

export default App;
