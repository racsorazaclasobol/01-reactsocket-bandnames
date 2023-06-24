import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

    const [bands, setBands] = useState([]);
    const { socket } = useContext( SocketContext );

    useEffect( () => {
        socket.on( 'current-bands', ( data ) => {
            setBands(data);
        });

        return () => socket.off('current-bands')

    }, [socket] )

    const cambioNombre = ( event, idBand ) => {
        const nuevoNombre = event.target.value;
        
        setBands( bands => bands.map( band => {
            if( band.id === idBand ) {
                band.name = nuevoNombre;
            }
            return band;
        } ) );
        
    }

    const perdioFoco = ( idBand, nameBand ) => {
        socket.emit( 'cambiar-nombre', { id: idBand, name: nameBand } );
    }

    const votar = ( id ) => {
		socket.emit( 'votar-banda', id );
	}

    const borrar = ( id ) => {
		socket.emit( 'borrar-banda', id );
	}

    const crearRows = () => {
        return (
            bands.map( band => {

                return (
                    <tr key={ band.id }>
                        <td> 
                            <button 
                                className='btn btn-primary'
                                onClick={ () => votar( band.id ) } > + 1 </button> 
                        </td>
                        <td> 
                            <input 
                                type="text" 
                                className='form-control' 
                                value={ band.name } 
                                onChange ={ ( event ) => cambioNombre( event, band.id ) }
                                onBlur ={ () => perdioFoco( band.id, band.name ) }
                            />
                        </td>
                        <td> 
                            <h3> { band.votes } </h3> 
                        </td>
                        <td> 
                            <button 
                                className='btn btn-danger' 
                                onClick={ () => borrar( band.id ) }
                            >
                                Borrar
                            </button> 
                        </td>
                    </tr>
                );
            })
        );
    }

  return (
    <>
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                { crearRows() }
            </tbody>
        </table>
    </>
  )
}
