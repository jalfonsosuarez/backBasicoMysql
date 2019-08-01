// 
// Clase en Typescript para montar un servidor Express en el puerto indicado.
//

import express = require( 'express' );
import path = require( 'path' );
import bodyParser = require('body-parser');
import fileUpload = require( 'express-fileupload' );

export default class Server {

    public app: express.Application;
    public port: number;

    constructor( puerto: number ) {
        this.port = puerto;
        this.app = express();
        this.app.use( bodyParser.urlencoded({ extended: false }));
        this.app.use( bodyParser.json() );
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }) );
    }

    static init( puerto: number ) {
        return new Server( puerto );
    }

    private publicFolder() {

        const publicPath = path.resolve( __dirname, '../public');
        this.app.use( express.static( publicPath ) );
    }

    start( callback: Function ) {
        this.app.listen( this.port, callback );
        this.publicFolder();
    }
}