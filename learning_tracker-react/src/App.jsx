// src/App.jsx - Should look like this:
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{background: '#4361ee', padding: '1rem', color: 'white'}}>
          <h1>📚 Learning Tracker</h1>
          <Link to="/" style={{color: 'white', marginLeft: '20px'}}>Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;