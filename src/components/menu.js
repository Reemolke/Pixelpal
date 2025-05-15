function Menu(){
    const foodOnClick=(e) => {
        e.target.style.background = "red";
    }
    return (
        <div className="menu">
            <div>
                <div onClick={}>Comida</div>
                <div>Dormir</div>
            </div>
            <div>
                <div>Tienda</div>
                <div>Config</div>
            </div>
        </div>
    )
}
export default Menu;