import './App.css';
import Frame from './components/frame.js';
import Title from './components/title.js';
import Menu from './components/menu.js';
import Estado from './components/estado.js';
import Dormir from './components/dormir.js';
import Inicio from './components/inicio.js';
import { useState,useEffect,useRef } from 'react';
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




useBackgroundMusic("Pixelated Dreams.mp3",0.5,menuEstancia)
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
  if (user) {
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
}, [items]);

const zampar = (selectedFood) => {
  if (hambre + selectedFood.nutrition * 10 > 100) {
    setHambre(100);
  } else {
    setHambre(hambre + selectedFood.nutrition * 10);
  }

  setSelectedFood(null); // ⬅️ Mover aquí

  setItems((oldItems) => {
    const index = oldItems.findIndex(item => item.name === selectedFood.name);
    if (index === -1) return oldItems;

    const newItems = [...oldItems];
    newItems[index] = {
      ...newItems[index],
      count: newItems[index].count - 1
    };
    console.log(newItems[0])
    if (newItems[index].count <= 0) {
      newItems.splice(index, 1);
      if (newItems.length === 0) {
        return [];
      }
    }
    console.log(newItems[0])
    return newItems;
  });
  
  setMenuEstancia("comer");
  setTimeout(() => {
    setMenuEstancia("comida");
  }, 1200);
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
  const logOut = () =>{
    setUser(null)
    setMenuEstancia("inicio")
  }
  const showFood = (comida) =>{
    setSelectedFood(comida);
  }
  const renderMenuSecundario = () =>{
    switch(menuEstancia) {
      case "comida" :
        return <div className='menuSecundario' style={{alignItems: "center",color:"wheat"}}>
          {selectedFood &&(<div style={{border: "3px solid black", borderRadius: "5%",width: "100%"}}>
          <img src={selectedFood.name}></img>
          <div style={{display: "flex",flexDirection: "row"}}><div
            className="barraNutricionRelleno"
            style={{ width: `${hambre}%`,backgroundColor: "rgb(121, 233, 145);", zIndex: 0 }}
          ></div><div className="barraNutricionRelleno" style={{ width: `${selectedFood.nutrition*10}%` ,backgroundColor: "#FFFF91"}}></div></div>
          </div>)}
          {
  selectedFood? (
    <div className="card" onClick={() => zampar(selectedFood)}>Comer</div>
  ) : (
    <p style={{fontSize: "0.7vw"}}>No hay comida</p>
  )
}
      </div>
      case "tienda" :
      return <div className='menuSecundario' style={{color: "wheat"}}>
        
        {food.map((item) => (
        <div key={item.id} className="card">
          <h2><img style={{width: "32px",height:"32px"}} src={item.name}></img>
x{item.count}</h2>
        </div>
        
      ))}
      {food.length > 0 && (<div className='botonComprar'  onClick={comprar}>
        <h3>Comprar</h3>
        </div>)}
      
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
        <Title home={home} logOut={logOut}></Title>
        <Frame setDinero={setDinero} dinero={dinero} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia} setDiversion={setDiversion} diversion={diversion}></Frame>
        <Menu user={user} setUser={setUser} setDiversion={setDiversion} diversion={diversion} setEnergia={setEnergia} energia={energia} items={items} setItems={setItems} food={food} setFood={setFood} menuEstancia={menuEstancia} setMenuEstancia={setMenuEstancia} showFood={showFood}></Menu>
      </div>
    </div>
  );
}


export function useBackgroundMusic(src, volume = 0.5, menuEstancia) {
  const audioRef = useRef(null);

  // Crear el audio una sola vez
  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [src, volume]);

  // Controlar reproducción según menuEstancia
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (menuEstancia === "juego" || menuEstancia === "inicio") {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play().catch((err) => {
        console.warn("Error al reproducir música:", err);
      });
    }
  }, [menuEstancia]);
}

export default App;
