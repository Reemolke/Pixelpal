import { useState } from "react";
import Comida from "./comida.js";
import Tienda from "./tienda.js";
import Dormir from "./dormir.js";
import LoginComponent from "./inicio.js";
function Menu({items,setItems,food,setFood,menuEstancia,setMenuEstancia,showFood,setEnergia,energia,user,setUser,diversion,setDiversion}){

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
                        <div onClick={() => setMenuEstancia("juego")}>Minijuegos</div>
                    </div>
                </div>
            )
        case "comida":
            return <Comida items={items} setItems={setItems} food={food} setFood={setFood} showFood={showFood}></Comida>;
        case "dormir":
            return <Dormir setEnergia={setEnergia} energia={energia}></Dormir>
        case "tienda":
            return <Tienda items={items} setItems={setItems} food={food} setFood={setFood}></Tienda>;
        case "juego":
            return <div className='valorDiv' style={{margin:"auto", display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <img src="diversion.png"/><div className='contenedorEstado'><div className='valorEstado' style={{ width: `${diversion}%` }}></div></div>
                    </div>;
        case "inicio":
            return <LoginComponent setMenuEstancia={setMenuEstancia} user={user} setUser={setUser}></LoginComponent>
        default:
            return <div></div>;
    }
};

return renderContenido();
}
export default Menu;