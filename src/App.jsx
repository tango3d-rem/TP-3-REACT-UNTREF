// App.jsx

import './App.css'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cotizador from './components/Cotizador';
import Historial from './components/Historial';
// import BtnVolver from './components/BtnVolver';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cotizador />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/cotizador" element={<Cotizador />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

