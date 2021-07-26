// obtenemos la response por default de express
const { response } = require('express');
const { validationResult } = require('express-validator');

//* "req" es lo que el usuario solicita
//* "res" es lo que el servidor envia

//! cada peticion debe retornar un unico "res", no es posible retornar mas
// asignamos "response" a "res" para que el intelligent de VSC nos ofrezca ayuda
const newUser = (req, res = response) => {
	const { name, email, password } = req.body;

	// el metodo validationResult() recibe el parametro "req"
	// retorna los errores retornados por el middleware check
	const error = validationResult(req);

	// agregarle el metodo status(<number>)
	// le adicionara un codigo de estado para saber el resultado de la peticion
	if (!error.isEmpty()) {
		return res.status(400).json({
			ok: false,
			// .mapped() retorna en un formato json los errores
			error: error.mapped(),
		});
	}

	res.status(201).json({
		ok: true,
		msg: 'new',
		name,
		email,
		password,
	});
};

// asignamos "response" a "res" para que el intelligent de VSC nos ofrezca ayuda
const loginUser = (req, res = response) => {
	const { email, password } = req.body;

	const error = validationResult(req);

	if (!error.isEmpty())
		return res.status(400).json({
			ok: false,
			error: error.mapped(),
		});

	res.status(202).json({
		ok: true,
		msg: 'login',
		email,
		password,
	});
};

// asignamos "response" a "res" para que el intelligent de VSC nos ofrezca ayuda
const RevalidarToker = (req, res) => {
	res.json({
		ok: true,
		msg: 'renew',
	});
};
// exportaremos diversas funciones por lo cual exportamos un objeto
module.exports = { newUser, loginUser, RevalidarToker };
