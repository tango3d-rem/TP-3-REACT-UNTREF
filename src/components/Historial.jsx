// Historial.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Historial = () => {
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
    setHistorialCotizaciones(historial);
  }, []);

  const eliminarCotizacion = (index) => {
    const historialActualizado = [...historialCotizaciones];
    historialActualizado.splice(index, 1);
    localStorage.setItem('historialCotizaciones', JSON.stringify(historialActualizado));
    setHistorialCotizaciones(historialActualizado);
  };

  return (
    <div className="historial">
      <h2>Historial de Cotizaciones</h2>
      <Link to="/cotizador" className="volver-cotizador">
        Volver al Cotizador
      </Link>
      <table>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Propiedad</th>
            <th>Ubicación</th>
            <th>Metros Cuadrados</th>
            <th>Poliza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {historialCotizaciones.map((cotizacion, index) => (
            <tr key={index}>
              <td>{cotizacion.fechaCotizacion}</td>
              <td>{cotizacion.propiedad}</td>
              <td>{cotizacion.ubicacion}</td>
              <td>{cotizacion.metrosCuadrados}</td>
              <td>{cotizacion.poliza}</td>
              <td>
                <button onClick={() => eliminarCotizacion(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historial;
