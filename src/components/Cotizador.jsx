// Cotizador.jsx

import React, { useState } from 'react';
import { datosUbicacion, costoM2, datosPropiedad } from './variables';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Cotizador = () => {
  const navigate = useNavigate();

  const [selectPropiedad, setSelectPropiedad] = useState({});
  const [selectUbicacion, setSelectUbicacion] = useState({});
  const [inputMetros2, setInputMetros2] = useState('');
  const [valorPoliza, setValorPoliza] = useState('');

  const realizarCotizacion = () => {
    const costoPoliza =
      costoM2 *
      parseFloat(selectPropiedad.factor) *
      parseFloat(selectUbicacion.factor) *
      parseInt(inputMetros2);
    setValorPoliza(costoPoliza.toFixed(2));
  };

  const guardarEnHistorial = () => {
    const cotizacion = {
      fechaCotizacion: new Date().toLocaleString(),
      propiedad: selectPropiedad.tipo,
      ubicacion: selectUbicacion.tipo,
      metrosCuadrados: inputMetros2,
      poliza: valorPoliza,
    };
  
    // Llamas a Swal.fire aquí para mostrar la notificación
    Swal.fire('Cotización guardada', '', 'success');
  
    const historialCotizaciones =
      JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
    historialCotizaciones.push(cotizacion);
    localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));
  };
  

  const alerta = (titulo, mensaje, icono) => {
    Swal.fire({
      icon: icono || '',
      title: titulo || '',
      text: mensaje,
      showConfirmButton: false,
      timer: 3500,
      width: '240px',
    });
  };

 
  return (
    <div className="div-cotizador">
      <h2>Cotizador de Seguros de Hogar</h2>
      <div className="separador"></div>
      <div>
        <label>Seleccione el tipo de propiedad:</label>
        <select
          onChange={(e) =>
            setSelectPropiedad(
              datosPropiedad.find((item) => item.factor == e.target.value)
            )
          }
          value={selectPropiedad.factor || '...'}
        >
          <option value="...">Seleccione</option>
          {datosPropiedad.map((elemento) => (
            <option key={elemento.tipo} value={elemento.factor}>
              {elemento.tipo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Seleccione la ubicación:</label>
        <select
          onChange={(e) =>
            setSelectUbicacion(
              datosUbicacion.find((item) => item.factor == e.target.value)
            )
          }
          value={selectUbicacion.factor || '...'}
        >
          <option value="...">Seleccione</option>
          {datosUbicacion.map((elemento) => (
            <option key={elemento.tipo} value={elemento.factor}>
              {elemento.tipo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Ingrese los metros cuadrados:</label>
        <input
          type="number"
          onChange={(e) => setInputMetros2(e.target.value)}
          value={inputMetros2}
        />
      </div>
      <button onClick={realizarCotizacion}>Cotizar</button>
      <div className="center separador">
        <p className="importe">
          Precio estimado: $ <span id="valorPoliza">{valorPoliza}</span>
          <span className={valorPoliza ? '' : 'ocultar'} title="Guardar en historial">
            💾
          </span>
        </p>
      </div>
      <button
        onClick={guardarEnHistorial}
        className={`guardar ${valorPoliza ? '' : 'ocultar'}`}
        title="Guardar en historial"
      >
        💾
      </button>
      <button
        onClick={() => navigate('/historial')}
        className={`ver-historial`}
        title="Ver Historial"
      >
        Ver Historial
      </button>
    </div>
  );
};

export default Cotizador;
