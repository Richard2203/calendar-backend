// obtenemos la response por default de express
const { response } = require('express');

// asignamos la repsonse a res para que el intelligent de VSC nos ofrezca ayuda
const newUser = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'new',
	});
};

// asignamos la repsonse a res para que el intelligent de VSC nos ofrezca ayuda
const loginUser = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'login',
	});
};

// asignamos la repsonse a res para que el intelligent de VSC nos ofrezca ayuda
const RevalidarToker = (req, res) => {
	res.json({
		ok: true,
		msg: 'renew',
	});
};
// exportaremos diversas funciones por lo cual exportamos un objeto
module.exports = { newUser, loginUser, RevalidarToker };
