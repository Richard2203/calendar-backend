// Comando para instalar JsonWebToken
// npm i jsonwebtoken

// *CONCEPTO
//      permite establecer una validacion al usuario, de tal modo que si el JWT
//      esta activo el usuario puede realizar peticiones al servidor
// *PARTES
//  -Header
//      indica el tipo de token que es y el tipo de algoritmo encriptador
//  -Payload
//      contiene la informacion a grabar en el token
//  -Verify Signature (firma)
//      -contiene una firma que debe hacer match con la firma del servidor
//       (firma de lectura y escritura deben hacer match)
//      -contiene el tiempo de expiracion del token

const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		payload = { uid, name };

		// sign(<payload:object>, <firma>, <Propieadades:object>,callback)
		// - expiresIn:<TiempoDuracion:string> establece el tiempo de expiracion
		// - callback - callback de la promesa, se maneja el proceso en caso de exito
		//   o falla
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{ expiresIn: '2h' },
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el token');
				}
				resolve(token);
			}
		);
	});
};

module.exports = { generarJWT };
