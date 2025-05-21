import { useState } from "react";
import Comida from "./comida.js";
import Tienda from "./tienda.js";
function Menu({items,setItems,food,setFood,menuEstancia,setMenuEstancia,showFood}){

    const renderContenido = () => {
    switch (menuEstancia) {
        case "menu":
            return (
                <div className="menu">
                    <div>
                        <div onClick={() => setMenuEstancia("comida")}>Comida</div>
                        <div onClick={() => setMenuEstancia("dormir")}>Dormir</div>
                    </div>
                    <div>
                        <div onClick={() => setMenuEstancia("tienda")}>Tienda</div>
                        <div onClick={() => setMenuEstancia("config")}>Config</div>
                    </div>
                </div>
            )
        case "comida":
            return <Comida items={items} setItems={setItems} food={food} setFood={setFood} showFood={showFood}></Comida>;
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