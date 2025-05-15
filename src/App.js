import './App.css';
import Frame from './components/frame.js';
import Title from './components/title.js';

function App() {
  return (
    <div className="App">
      <div className="tamagotchi">
        <Title></Title>
      <Frame></Frame>
      <div className="sidepanel"><h2>aaa</h2></div>
      </div>
    </div>
  );
}

export default App;
