import './App.css';
import Home from './components/Home';
import { useState } from 'react';
import MainAccess from './components/access/MainAccess';

function App() {
  const [logged, Setlogged] = useState(true);


  return (
    <div className="App">
      {logged ? <Home />: <MainAccess />}
    </div>

  );
}

export default App;
