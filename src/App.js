import './App.css';
import Frame from './components/frame.js';
import Title from './components/title.js';
import Menu from './components/menu.js';

function App() {
  return (
    <div className="App">
      <div className="tamagotchi">
        <Title></Title>
      <Frame></Frame>
      <Menu></Menu>
      </div>
    </div>
  );
}

export default App;
