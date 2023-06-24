import React, { useContext, useState } from 'react'
import { useSocket } from '../hooks/useSocket';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

	const [valor, setValor] = useState('');
	const { socket } = useContext( SocketContext );

	const onSubmit = ( event ) => {
		event.preventDefault();
		socket.emit( 'crear-banda', { name: valor } )
	}

	return (
		<>
			<h3>Agregar Banda</h3>

			<form onSubmit={ onSubmit }>
				<input 
					type="text" 
					className='form-control' 
					placeholder='Nombre Banda' 
					value={ valor }
					onChange={ ( event ) => setValor( event.target.value ) }	
				/>
			</form>
		</>
	)
}
