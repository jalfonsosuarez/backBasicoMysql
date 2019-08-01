// Ruta general

import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Esto funciona.'
    });


});

router.get("/info", (req: Request, res: Response) => {
    res.json({
        ok: true,
        info: {
            nombre: "carretillas",
            clases: [
                { nombre: "calidad", funcion: "Accede a tabla de calidades." },
                { nombre: "cargaMaxima", funcion: "Accede a tabla de cargas máximas." },
                { nombre: "centroTrabajo", funcion: "Accede a tabla de centros de trabajo." },
                { nombre: "cliente", funcion: "Accede a tabla de clientes." },
                { nombre: "empresa", funcion: "Accede a tabla de empresas." },
                { nombre: "familia", funcion: "Accede a tabla de familias." },
                { nombre: "formaPago", funcion: "Accede a tabla de formas de pago." },
                { nombre: "maquina", funcion: "Accede a tabla de máquinas." },
                { nombre: "marca", funcion: "Accede a tabla de marcas." },
                { nombre: "mastil", funcion: "Accede a tabla de mástiles." },
                { nombre: "modelo", funcion: "Accede a tabla de modelos." },
                { nombre: "neumatico", funcion: "Accede a tabla de neumáticos." },
                { nombre: "periodo", funcion: "Accede a tabla de tipos de periodos." },
                { nombre: "propulsion", funcion: "Accede a tabla de tipos de propulsiones." },
                { nombre: "revision", funcion: "Accede a tabla de tipos de revisiones." },
                { nombre: "ubicacion", funcion: "Accede a tabla de tipos de ubicaciones." },
                { nombre: "categoria", funcion: "Accede a tabla de categorias." },
                { nombre: "color", funcion: "Accede a tabla de colores." },
                { nombre: "estadoAviso", funcion: "Accede a tabla de estados de avisos." },
                { nombre: "estadoMaquina", funcion: "Accede a tabla de estados de maquinas." },
                { nombre: "estadoParte", funcion: "Accede a tabla de estados de partes." },
                { nombre: "prioridad", funcion: "Accede a tabla de prioridades." },
            ]
        }
    });
});


router.get( '/prueba', (req: Request, res: Response ) => {

    const query = `
        SELECT *
        FROM clientes`;

    MySQL.query( query, ( err: any, clientes: Object[] ) => {

        if ( err ) {

            res.status(400).json({
                ok: false,
                error: err
            });

        } else {

            res.json( {
                ok: true,
                clientes: clientes
            });

        }

    });


});

router.get( '/prueba/:id', (req: Request, res: Response ) => {

    const id = req.params.id;

    const escId = MySQL.escape( id );

    const query = `
        SELECT *
        FROM clientes
        WHERE id = ${ escId }`;

    MySQL.query(query, (err: any, cliente: Object[]) => {

        if (err) {

            res.status(400).json({
                ok: false,
                error: err
            });

        } else {

            res.json({
                ok: true,
                cliente: cliente[0]
            });

        }

    });

});



export default router;
