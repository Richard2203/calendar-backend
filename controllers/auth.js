// obtenemos la response por default de express
const { response } = require('express');
const Usuario = require('../models/Usuario');

//* "req" es lo que el usuario solicita
//* "res" es lo que el servidor envia

//! cada peticion debe retornar un unico "res", no es posible retornar mas
// asignamos "response" a "res" para que el intelligent de VSC nos ofrezca ayuda
const newUser = async (req, res = response) => {
	try {
		// creando una nueva instancia de Usuario
		const usuario = new Usuario(req.body);

		// .save() retorna una promesa
		// guardando el objeto usuario en la bd
		await usuario.save();

		res.status(201).json({
			ok: true,
			msg: 'Registro Exitoso',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'El correo ya esta ocupado',
		});
	}
};

// asignamos "response" a "res" para que el intelligent de VSC nos ofrezca ayuda
const loginUser = (req, res = response) => {
	const { email, password } = req.body;

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
