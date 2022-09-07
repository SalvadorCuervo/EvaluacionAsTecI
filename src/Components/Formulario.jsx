import React, { createRef, useState } from 'react';

function Formulario() {
    const nombreRef = createRef('');
    const paternoRef = createRef('');
    const maternoRef = createRef('');
    const edadRef = createRef('');
    const fechaNacRef = createRef('');
    const rfcRef = createRef('');

    const [ error, setError ] = useState( false );
    const [ success, setSuccess ] = useState( false );
    const [ informacion, setInfomacion ] = useState( null );
    const RFC_EXPR = /^(([A-Z]{1}[AEIOU]{1}[A-Z]{1,2}))([0-9]{2})(0[1-9]|1[0-2])([0-9]{2})\b/;
    

    const validar = (evt) => {
        evt.preventDefault();
        setError( false );
    
        const nombre = nombreRef.current.value;
        const paterno = paternoRef.current.value;
        const materno = maternoRef.current.value;
        const edad = edadRef.current.value;
        const fechaNac = fechaNacRef.current.value;
        if( nombre !== '' && paterno !== '' && paterno.length > 2 && materno !== '' && edad !== '' && fechaNac !== '' ){
            setInfomacion({ nombre, paterno, materno, edad, fechaNac });
        }else{
            setError( 'Complete todos los campos.' );
        }
    }

    const generarRFC = ( datos ) => {
        const fecha = datos.fechaNac.split('-');
        const cadenaRFC = datos.paterno.slice(0,2) + datos.materno.charAt(0) + datos.nombre.charAt(0) +
                        fecha[0].slice(2,4) + fecha[1] + fecha[2];
        return cadenaRFC;
    }

    const confirmar = (evt) => {
        evt.preventDefault();
        setSuccess( false );
        setError( false );

        const rfc = rfcRef.current.value;
        const RFCGenerado = generarRFC(informacion);
        if( rfc !== '' && rfc.length === 10 ){
            if( RFC_EXPR.test( rfc ) ){
                if( RFCGenerado.toUpperCase() == rfc.toUpperCase() ){
                    setSuccess( `El RFC ${RFCGenerado} es correcto.` );
                }else{
                    setError( 'El RFC no coincide con los datos ingresados.' );
                }
            }else{
                setError( 'El RFC ingresado no cumple con la estructura adecuada.' );
            }
        }else{
            setError( 'Completa tu RFC.' );
        }
    }

    return (
        <div className="card">
            <form onSubmit={validar}>
                <label className="mb-2"> Nombre </label>
                <input className="form-control mb-2" type="text" placeholder="Nombre" ref={nombreRef}/>

                <label className="mb-2"> Apellido Paterno </label>
                <input className="form-control mb-2" type="text" placeholder="Apellido Paterno" ref={paternoRef}/>

                <label className="mb-2"> Apellido Materno </label>
                <input className="form-control mb-2" type="text" placeholder="Apellido Materno" ref={maternoRef}/>

                <label className="mb-2"> Edad </label>
                <input className="form-control mb-2" type="number" placeholder="Edad" ref={edadRef}/>

                <label className="mb-2"> Fecha Nacimiento </label>
                <input className="form-control mb-2" type="date" placeholder="Fecha Nacimiento" ref={fechaNacRef}/>

                { !informacion &&
                    <button type="submit" className="form-control btn btn-primary mb-2"> VALIDAR </button> }
            </form>

            { informacion &&
                <form onSubmit={confirmar}>
                    <hr />
                    <label className="mb-2"> Ingresa RFC sin homoclave (10 carácteres) </label>
                    <input className="form-control mb-2" type="text" placeholder="RFC" maxLength={10} ref={rfcRef}/>

                    <button type="submit" className="form-control btn btn-primary mb-2"> CONFIRMAR </button>
                </form>
            }

            { error &&
                <div className="alert alert-danger mt-2 mb-2" role="alert">
                    { error }
                </div>
            }

            { success &&
                <div className="alert alert-success mt-2 mb-2" role="alert">
                    { success }
                </div>
            }
        </div>
    );
}

export default Formulario;