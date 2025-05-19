import { useState } from "react";
import Comida from "./comida.js";
import Tienda from "./tienda.js";
function Menu({items,setItems,food,setFood}){

    const [estancia,setEstancia] = useState('menu');
    const renderContenido = () => {
    switch (estancia) {
        case "menu":
            return (
                <div className="menu">
                    <div>
                        <div onClick={() => setEstancia("comida")}>Comida</div>
                        <div onClick={() => setEstancia("dormir")}>Dormir</div>
                    </div>
                    <div>
                        <div onClick={() => setEstancia("tienda")}>Tienda</div>
                        <div onClick={() => setEstancia("config")}>Config</div>
                    </div>
                </div>
            )
        case "comida":
            return <Comida items={items} setItems={setItems} food={food} setFood={setFood}></Comida>;
        case "dormir":
            return <div><h1>😴 Dormir</h1></div>;
        case "tienda":
            return <Tienda items={items} setItems={setItems} food={food} setFood={setFood}></Tienda>;
        case "config":
            return <div><h1>⚙️ Configuración</h1></div>;
        default:
            return <div><h1>👾 Pantalla desconocida</h1></div>;
    }
};

return renderContenido();
}
export default Menu;