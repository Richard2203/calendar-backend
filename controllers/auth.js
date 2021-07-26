// obtenemos la response por default de express
const { response } = require('express');
const Usuario = require('../models/Usuario');

// esta libreria nos permite realizar encriptaciones hash
// se instala con el comando:
// 	 npm i bcryptjs
const bcrypt = require('bcryptjs');

//* "req" es lo que el usuario solicita
//* "res" es lo que el servidor envia

//! cada peticion debe retornar un unico "res", no es posible retornar mas
// asignamos "response" a "res" para que el intelligent de VSC nos ofrezca ayuda
const newUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		// .findOne({ <NomPropieadad> }) retorna el primer objeto cuya propieadad
		// sea igual al valor mandado
		let usuario = await Usuario.findOne({ email });

		if (usuario)
			return res.status(500).json({
				ok: false,
				msg: 'el correo ya esta en uso',
			});

		// creando una nueva instancia de Usuario
		usuario = new Usuario(req.body);

		//* ENCRIPTAR CONTRASENIA
		// genSaltSync() establece el numero de rondas (vueltas) que hara par
		// encriptar
		const salt = bcrypt.genSaltSync();

		// hashSync(<DatoAEncriptar:string>, salt)
		usuario.password = bcrypt.hashSync(password, salt);

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
			msg: 'Por favor hable con el administrador',
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
