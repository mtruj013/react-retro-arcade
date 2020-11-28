import './App.scss';
import Header from './components/header/Header';
import SelectGameButton from './components/main-content/SelectGameButton';


function App() {
  return (
    <div className="App">
      <div className="header-div">
        <Header />
      </div>
      <div className="content">
        <SelectGameButton>Teris</SelectGameButton>
        <SelectGameButton>Snake</SelectGameButton>
        <SelectGameButton>Pong</SelectGameButton>
      </div>
    </div>
  );
}

export default App;
