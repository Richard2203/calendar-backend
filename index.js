const express = require('express');

// nos permite obtener y ver que variables de entorno existen
require('dotenv').config();

//*CREANDO SERVIDOR DE EXPRESS
const app = express();

//* DIRECTORIO PUBLICO
// use() es un middleware, es decir es una funcion que se ejecuta al momento
// de hacer una peticion al servidor. Recibe un express.static()
// express.static('directorio:string') retorna un servidor estatico
app.use(express.static('public'));

//* LECTURA Y PARSEO DEL BODY
// empleando el middleware use para recibir los objetos JSON enviandos
// por el usuario
app.use(express.json());

//* RUTAS
// use() es un middleware, es decir es una funcion que se ejecuta al momento
// de hacer una peticion al servidor. Recibe dos argumentos:
//  -ruta que manejara ----> 'path':string
//  -archivos que contendra  ---> require('./pathArchivos')

app.use('/api/auth', require('./routes/auth'));

//*ESCUCHAR PETICIONES
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`servidor corriendo en puerto ${port}`);
});
