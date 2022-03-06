import logo from './logo.svg';
import './App.css';
import Register from './components/access/register';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/access/Login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>

  );
}

export default App;
