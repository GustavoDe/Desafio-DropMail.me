const corsAnywhere = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Permitir todas as origens
}).listen(port, host, () => {
  console.log(`Servidor de proxy CORS Anywhere iniciado em http://${host}:${port}`);
});
