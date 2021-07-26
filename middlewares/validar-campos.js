const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
	// el metodo validationResult() recibe el parametro "req"
	// retorna los errores retornados por el middleware check
	const error = validationResult(req);

	// agregarle el metodo status(<number>)
	// le adicionara un codigo de estado para saber el resultado de la peticion
	!error.isEmpty() &&
		res.status(400).json({
			ok: false,
			// .mapped() retorna en un formato json los errores
			error: error.mapped(),
		});

	// el metodo next() mand a llamar cada una de las verificaciones check
	// una vez valida una ira con la siguiente hasta finalizar cada una
	next();
};

module.exports = validarCampos;
