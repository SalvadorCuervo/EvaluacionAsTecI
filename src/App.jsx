import React, { useState } from 'react';
import Formulario from './Components/Formulario';
import Pantalla from './Components/Pantalla';
import Tabla from './Components/Tabla';
import './App.css';

function App() {
  const [ mostrar, setMostrar ] = useState( <Formulario /> );

  return (
    <div className="App">
        <div className="btn-group d-flex justify-content-center mb-2" role="group">
            <button onClick={() => setMostrar( <Formulario /> )}type="button" className="btn btn-outline-secondary"> Formulario </button>
            <button onClick={() => setMostrar( <Pantalla /> )}type="button" className="btn btn-outline-secondary"> Pantalla </button>
            <button onClick={() => setMostrar( <Tabla /> )}type="button" className="btn btn-outline-secondary"> Tabla </button>
        </div>
        { mostrar }
    </div>
  )
}

export default App;