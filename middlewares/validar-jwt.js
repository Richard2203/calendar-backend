const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarjwt = (req, res = response, next) => {
	// los headers personalizados por convencion emplean
	// "x-" seguido del nombre del campo header
	const token = req.header('x-token');

	// si el token no viene entonces el usuario no esta autenticado
	// y retornamos un msg="no hay token"
	if (!token)
		return res.status(401).json({
			ok: false,
			msg: 'no hay token existente',
		});

	try {
		// verify(token:string,<VarEntorno>) retorna un objeto con la informacion
		// encriptada por el token
		const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

		// asignando el uid y el name a "req" para poderlo manipular en el metodo
		// RevalidarToker
		req.uid = uid;
		req.name = name;
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			ok: false,
			msg: 'token no valido',
		});
	}

	// next() se ejecutara si todo fue correcto
	next();
};

module.exports = { validarjwt };
