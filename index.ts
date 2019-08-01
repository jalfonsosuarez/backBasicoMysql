//

import Server from './src/server/server';
import router from './src/router/router';
import enviroment = require('./src/global/enviroment');
import MySQL from './src/mysql/mysql';

const server = Server.init( 3000 );

server.app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.app.use( '/', router );


MySQL.instance;

server.start( () => {
    console.log('Servidor en puerto ' + enviroment.SERVER_PORT );
});

