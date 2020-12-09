import './App.scss';
import Header from './components/header/Header';
import SelectGameButton from './components/main-content/SelectGameButton';
import { useHistory } from 'react-router-dom';


function App() {
  const history = useHistory();

  return (
    <div className="App">
      <div className="header-div">
        <Header />
      </div>
      <div className="content">
        <SelectGameButton clickHandler={() => history.push('/tetris')}>Teris</SelectGameButton>
        <SelectGameButton>Snake</SelectGameButton>
        <SelectGameButton>Pong</SelectGameButton>
      </div>
    </div>
  );
}

export default App;
