function Title({ home }) {
  return (
    <div style={{display: "flex",justifyContent: "space-evenly",width: "100%"}}>
      <div className="back">
        <h1>Exit</h1>
      </div>
      <div className="title" onClick={home}>
        <h1>Pixelpal</h1>
      </div>
      <div className="log out">
        <h1>Exit</h1>
      </div>
    </div>
    
  );
}
export default Title;
