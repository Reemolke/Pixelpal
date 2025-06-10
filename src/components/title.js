function Title({ home }) {
  return (
    <div style={{display: "flex",justifyContent: "space-evenly",width: "100%"}}>
      <div className="back" onClick={home}>
      </div>
      <div className="title">
        <h1>Pixelpal</h1>
      </div>
      <div className="logout">
      </div>
    </div>
    
  );
}
export default Title;
