import { useState } from "react";
import Comida from "./comida.js";
import Tienda from "./tienda.js";
import Dormir from "./dormir.js";
function Menu({items,setItems,food,setFood,menuEstancia,setMenuEstancia,showFood,setEnergia,energia}){

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
            return <Dormir setEnergia={setEnergia} energia={energia}></Dormir>
        case "tienda":
            return <Tienda items={items} setItems={setItems} food={food} setFood={setFood}></Tienda>;
        case "config":
            return <div><h1>⚙️ Configuración</h1></div>;
        case "inicio":
            return <div><h1>Iniciar sesión</h1></div>
        default:
            return <div><h1>👾 Pantalla desconocida</h1></div>;
    }
};

return renderContenido();
}
export default Menu;