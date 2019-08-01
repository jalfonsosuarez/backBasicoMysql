// JASM - 01.03.2019
import MySQL from '../mysql/mysql';

export class x3OpcionesClass {

    getOpciones( opciones: any ): string {

        let cad: string = '';

        if ( opciones ) {

            if (opciones.filtro && opciones.filtro.length > 0 ) {

                cad += 'WHERE ';
                for ( let op of opciones.filtro ) {

                    if ( !op.operador ) {
                        op.operador = 'LIKE';
                    }
                    let v = MySQL.escape(op.valor);
                    
                    if ( op.operador === 'LIKE' ) {
                        v = v.replace(/'/, '');
                        v = v.replace(/'/, '');
                        cad += op.columna + ' LIKE "%' + v + '%" AND ';
                    } else {
                        cad += op.columna + ' ' + op.operador + ' ' + v + ' AND ';
                    }
                }

                cad = cad.substring(0, cad.length - 4);
    
            }

            if (opciones.orden && opciones.orden.length > 0 ) {
                cad += 'ORDER BY ';

                for ( let or of opciones.orden ) {
                    cad += or.columna + ' ' + or.tipo + ','
                }

                cad = cad.substring(0, cad.length-1 );
            }

        }

        return cad;

    }


}