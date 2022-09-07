import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Tabla() {
    const [ informacion, setInformacion ] = useState( null );
    const [ totalRegistros, setTotalRegistros ] = useState( null );
    const [ posicion, setPosicion ] = useState( 0 );
    const [ openModal, setOpenModal ] = useState( false );
    const [ elementSelect, setElementSelect ] = useState( false );
    
    useEffect(() => {
        axiosApi();
    }, []);

    const axiosApi = () => {
        axios.get( `https://api.datos.gob.mx/v1/condiciones-atmosfericas` )
            .then( respuesta => {
                setInformacion( separarRegistros(respuesta.data.results, 10) );
                setTotalRegistros( respuesta.data.pagination );
            })
            .catch( error => { console.log( error ) })
    }

    const separarRegistros = ( informacion, cantidad ) => {
        var resultado = [];
        for ( var i = 0; i < informacion.length; i += cantidad ) {
            resultado.push( informacion.slice( i, i + cantidad ));
        }
        return resultado;
    }

    const consultarInformacion = ( element ) => {
        setOpenModal( true );
        setElementSelect( element );
    }

    return (
        <React.Fragment>
            <div className="card">
                { informacion ?
                    <React.Fragment>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col"> _id </th>
                                    <th scope="col"> cityid </th>
                                    <th scope="col"> name </th>
                                    <th scope="col"> state </th>
                                    <th scope="col"> probabilityofprecip </th>
                                    <th scope="col"> relativehumidity </th>
                                    <th scope="col"> Lastreporttime </th>
                                    <th scope="col"> LLUEVE </th>
                                </tr>
                            </thead>

                            <tbody>
                                { informacion[ posicion ].map( element => (
                                    <tr key={element._id} onClick={() => consultarInformacion(element)}>
                                        <th scope="row"> {element._id} </th>
                                        <td> {element.cityid} </td>
                                        <td> {element.name} </td>
                                        <td> {element.state} </td>
                                        <td> {element.probabilityofprecip} </td>
                                        <td> {element.relativehumidity} </td>
                                        <td> {element.lastreporttime} </td>
                                        { element.probabilityofprecip > 60 || element.relativehumidity > 50 ?
                                            <td> SI </td> : <td> NO </td> }
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div>
                            <b> Total de registros: </b> {totalRegistros.total}
                        </div>

                        <nav>
                            <ul className="pagination justify-content-center">
                                { informacion.map( (element, index) => (
                                    <li key={index} className="page-item" onClick={() => setPosicion(index)}>
                                        <a className="page-link" href="#"> {index+1} </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </React.Fragment>
                    :
                    <center>
                        <div className="spinner-border" role="status">
                            <span className="sr-only" />
                        </div>
                    </center>
                }
            </div>

            <Modal open={openModal} onClose={() => setOpenModal(false)} >
                <Box sx={style}>
                    <div>
                        <h4> Detalles </h4>
                        <hr />
                        <div> <b> _id: </b> {elementSelect._id} </div>
                        <div> <b> cityid: </b> {elementSelect.cityid} </div>
                        <div> <b> name: </b> {elementSelect.name} </div>
                        <div> <b> state: </b> {elementSelect.state} </div>
                        <div> <b> probabilityofprecip: </b> {elementSelect.probabilityofprecip} </div>
                        <div> <b> relativehumidity: </b> {elementSelect.relativehumidity} </div>
                        <div> <b> lastreporttime: </b> {elementSelect.lastreporttime} </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Tabla;