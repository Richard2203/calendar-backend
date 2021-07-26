const express = require('express');

// nos permite obtener y ver que variables de entorno existen
require('dotenv').config();

//creando servidor de express
const app = express();

// Directorio publico
// use() es un middleware, es decir es una funcion que se ejecuta al momento
// de hacer una peticion al servidor. Recibe un express.static()
// express.static('directorio:string') retorna un servidor estatico
app.use(express.static('public'));

// rutas
// .get() retorna una peticion hecha al servidor
// primer argumento es el path url, segundo argumento es un callback
// donde ira el retorno del get
app.get('/', (req, res) => {});

//escuchar peticiones
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`servidor corriendo en puerto ${port}`);
});
