// BtnVolver.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function BtnVolver() {
  return (
    <div className="main">
      <Link to="/">
        <button className="buttonCotizacion">
          Volver
          <div className="button__horizontal"></div>
          <div className="button__vertical"></div>
        </button>
      </Link>
    </div>
  );
}

export default BtnVolver;
