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
  const [hambre, setHambre] = useState(null);
  const [higiene, setHigiene] = useState(null);
  const [energia, setEnergia] = useState(null);
  const [diversion, setDiversion] = useState(null);
  const [items,setItems] = useState([]);
  const [food,setFood] = useState([]);
  const [menuEstancia,setMenuEstancia] = useState("inicio");
  const [selectedFood,setSelectedFood] = useState();
  const [user, setUser] = useState(null);
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [dinero,setDinero] = useState(0.0);
  const comprar = () => {
    let sum;
    food.forEach(element => {
      sum =+ element.price;
    });
    if(sum < dinero){
      setItems(prevItems => [...prevItems, ...food]);
      setFood([]);
      setDinero(Number((dinero-sum).toFixed(2)));
    }else{
      alert("No tienes dinero suficiente");
    }
  };
  

useEffect(() => {
  const cargarEstado = async () => {
    if (!user?.uid) return;

    try {
      const docRef = doc(db, 'estados', user.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        const tiempoPasado = (Date.now() - data.lastUpdate) / 1000; // en segundos
        const deterioro = tiempoPasado * 0.00231;

        const safe = (valor) => (typeof valor === "number" ? valor : 100);
        console.log('hambre:', data.hambre);
        setHambre(Math.max(safe(data.hambre) - deterioro, 0));
        setHigiene(Math.max(safe(data.higiene) - deterioro, 0));
        setEnergia(Math.max(safe(data.energia) - deterioro, 0));
        setDiversion(Math.max(safe(data.diversion) - deterioro, 0));
        setDinero(data.dinero);
      } else {
        setHambre(100);
        setHigiene(100);
        setEnergia(100);
        setDiversion(100);
        setDinero(0);
      }
      setCargandoInicial(false);
    } catch (error) {
      console.error(error);
      setCargandoInicial(false);
    }
  };

  cargarEstado();
}, [user?.uid]);
useEffect(() => {
  const guardarAntesDeSalir = (event) => {
    if (!user?.uid) return;

    const docRef = doc(db, 'estados', user.uid);
    setDoc(docRef, {
      hambre,
      higiene,
      energia,
      diversion,
      lastUpdate: Date.now(),
      dinero
    }, { merge: true });

    // Opcional: mostrar confirmación de salida (a veces bloqueado por navegadores modernos)
    // event.preventDefault();
    // event.returnValue = '';
  };

  window.addEventListener('beforeunload', guardarAntesDeSalir);

  return () => {
    window.removeEventListener('beforeunload', guardarAntesDeSalir);
  };
}, [hambre, higiene, energia, diversion,dinero, user?.uid]);





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

const zampar = (selectedFood) => {
  
  if(hambre+selectedFood.nutrition*10 > 100){
    setHambre(100);
  }else{
    setHambre(hambre + selectedFood.nutrition * 10);
  }

  setItems((oldItems) => {
    // Buscar el índice del item por nombre
    const index = oldItems.findIndex(item => item.name === selectedFood.name);
    if (index === -1) return oldItems; // no encontrado, no cambiar nada

    // Crear copia del array
    const newItems = [...oldItems];

    // Restar 1 al count
    newItems[index] = {
      ...newItems[index],
      count: newItems[index].count - 1
    };

    // Si count es 0 o menos, eliminar item
    if (newItems[index].count <= 0) {
      newItems.splice(index, 1);
    }

    return newItems;
  });
};
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
    if(menuEstancia !== "inicio"){
      setMenuEstancia("menu");
      setSelectedFood();
      setFood([]);
    }

  }
  const showFood = (comida) =>{
    setSelectedFood(comida);
  }
  const renderMenuSecundario = () =>{
    switch(menuEstancia) {
      case "comida" :
        return <div className='menuSecundario' style={{alignItems: "center"}}>
          {selectedFood &&(<div style={{border: "3px solid black", borderRadius: "5%",width: "100%"}}>
          <h1>{selectedFood.name}</h1>
          <div style={{display: "flex",flexDirection: "row"}}><div
            className="barraNutricionRelleno"
            style={{ width: `${hambre}%`,backgroundColor: "rgb(121, 233, 145);", zIndex: 0 }}
          ></div><div className="barraNutricionRelleno" style={{ width: `${selectedFood.nutrition*10}%` ,backgroundColor: "#FFFF91"}}></div></div>
          </div>)}
          <div className='card' onClick={() => zampar(selectedFood)}>Comer</div>
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
        return <Estado dinero={dinero} user={user} menuEstancia={menuEstancia} selectedFood={selectedFood} setEnergia={setEnergia} setDiversion={setDiversion} setHambre={setHambre} setHigiene={setHigiene} higiene={higiene} hambre={hambre} diversion={diversion} energia={energia} ></Estado>
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
        <Frame setDinero={setDinero} dinero={dinero} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia}></Frame>
        <Menu user={user} setUser={setUser} setEnergia={setEnergia} energia={energia} items={items} setItems={setItems} food={food} setFood={setFood} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia} showFood={showFood}></Menu>
      </div>
    </div>
  );
}

export default App;
