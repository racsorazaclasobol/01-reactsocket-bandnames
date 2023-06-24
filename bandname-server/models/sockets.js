const BandList = require('./band-list');

class Sockets {

    constructor( io ) {

        this.io = io;
        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {

        // On connection
        this.io.on( 'connection', ( socket ) => {
            
            console.log('Cliente conectado.');
            
            socket.emit( 'current-bands', this.bandList.getBands() );

            socket.on( 'votar-banda', ( id ) => {
                this.bandList.increaseVotes( id );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });

            socket.on( 'borrar-banda', ( id ) => {
                this.bandList.removeBand( id );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });

            socket.on( 'cambiar-nombre', ( {id, newName} ) => {
                this.bandList.changeName( id, newName );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });

            socket.on( 'crear-banda', ( { name } ) => {
                this.bandList.addBand( name );
                this.io.emit( 'current-bands', this.bandList.getBands() );
            });

        });



    }


}


module.exports = Sockets;