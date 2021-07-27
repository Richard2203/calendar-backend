// obtenemos la response por default de express
const { response } = require('express');
const Usuario = require('../models/Usuario');

// esta libreria nos permite realizar encriptaciones hash
// se instala con el comando:
// 	 npm i bcryptjs
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

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

		//* GENERAR JWT
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(201).json({
			ok: true,
			msg: 'Registro Exitoso',
			uid: usuario.id,
			name: usuario.name,
			token,
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
const loginUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		// .findOne({ <NomPropieadad> }) retorna el primer objeto cuya propieadad
		// sea igual al valor mandado
		let usuario = await Usuario.findOne({ email });

		if (!usuario)
			return res.status(500).json({
				ok: false,
				msg: 'Usuario o contraseña incorrectos',
			});

		//*COMPARANDO CONTRASENIAS
		// compareSync(<StringObtenido:string>,<StringEncriptadoPreviamente:string>)
		// retorna booleano
		const validPassword = bcrypt.compareSync(password, usuario.password);

		if (!validPassword)
			return res.status(500).json({
				ok: false,
				msg: 'Usuario o contraseña incorrectos',
			});

		//* GENERAR JWT
		const token = await generarJWT(usuario.id, usuario.name);

		//* LOGIN ACEPTADO
		res.json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

// asignamos "response" a "res" para que el intelligent de VSC nos ofrezca ayuda
const RevalidarToker = async (req, res) => {
	// uid y name vienene de "req" y "req" obtuvo la informacion de la validacion
	// del token
	const { uid, name } = req;

	//* GENERANDO UN TOKEN
	const token = await generarJWT(uid, name);
	res.json({
		ok: true,
		uid,
		name,
		token,
	});
};
// exportaremos diversas funciones por lo cual exportamos un objeto
module.exports = { newUser, loginUser, RevalidarToker };
