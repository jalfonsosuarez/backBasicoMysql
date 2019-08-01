//
// CLASE REUTILIZABLE PARA MySQL
// Hace uso del patrón singleton para evitar varias instancias de la clase
//

import mysql = require( 'mysql' );
import enviroment = require( '../global/enviroment');


export default class MySQL {

    private static _instance: MySQL;

    conex: mysql.Connection;
    conectado: boolean = false;

    private constructor() {

        console.log('MySQL inicializado');
        this.conex = mysql.createConnection({
            host: enviroment.MYSQL_HOST,
            user: enviroment.MYSQL_USER,
            password: enviroment.MYSQL_PASS,
            database: enviroment.MYSQL_DB,
            multipleStatements: true
        });

        this.connect();

    }

    public static get instance() {
        
        return this._instance || ( this._instance = new this() );

    }

    private connect() {

        this.conex.connect( (err: mysql.MysqlError) => {
            
            if ( err ) {
                console.log( err.message );
                return;
            } 
            
            this.conectado = true;
            console.log( 'Base de datos on line' );
        });

    }

    static query( query: string, callback: Function ) {

        this.instance.conex.query( query, ( err, results: Object[], fields: any) => {

                if ( err ) {
                    console.log( 'Error en query' );
                    console.log( err );
                    return callback( err );
                }

                // if ( results.length === 0 ) {
                //     callback( 'Sin datos')
                // } else {
                //     callback( null, results );
                // }
                callback( null, results );
        });

    }

    static command( query: string, callback: Function ) {

        this.instance.conex.query( query, ( err: any, result: Object[] ) => {

                if ( err ) {
                    
                    // console.log( 'Error en query' );
                    // console.log( err );
                    return callback( err );
                }
            
            callback(null, JSON.parse(JSON.stringify(result)).insertId );
        });

    }

    static commandMultiple( query: string, callback: Function ) {

        this.instance.conex.query( query, ( err: any, results: Object[] ) => {

                if ( err ) {
                    
                    // console.log( 'Error en query' );
                    // console.log( err );
                    return callback( err );
                }
            
            callback(null, JSON.parse(JSON.stringify(results)) );
        });

    }

    static escape( valor: any ) {
        return this.instance.conex.escape( valor );
    }

    static bool2number( valor: boolean ): number {
        return (valor ? 1 : 0);
    }

    static getLastId() {

        return new Promise( ( resolve, reject ) => {

            const query = `
                SELECT LAST_INSERT_ID() AS lastId`;
    
            this.instance.conex.query(query, (err: any, rows: Object[]) => {
    
                if (err) {
                    console.log('Error en query');
                    console.log(err);
                    reject( err );
                }
    
                let row = JSON.parse(JSON.stringify(rows))[0];
                
                resolve( row.lastId );
    
            });

        });


    }
}