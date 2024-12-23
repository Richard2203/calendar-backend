const { Router } = require('express');

// express-validator nos permite hacer validaciones
// se instala con el comando npm i express-validator
const { check } = require('express-validator');

// Router() retorna un router
const router = Router();

const validarCampos = require('../middlewares/validar-campos');

const { loginUser, RevalidarToker, newUser } = require('../controllers/auth');
const { validarjwt } = require('../middlewares/validar-jwt');

// -metodo "check"  es un middleware que valida campos, not().isEmpty() indica
// no debe estar vacio el campo
router.post(
	'/new',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'El password debe ser de al menos 8 caracteres'
		).isLength({ min: 8 }),
		validarCampos,
	],
	newUser
);

router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'El password debe ser de al menos 8 caracteres'
		).isLength({ min: 8 }),
		validarCampos,
	],
	loginUser
);

// .get() retorna una peticion hecha al servidor
// primer argumento es el path url, segundo argumento es un callback
// donde ira el retorno del get
router.get('/renew', validarjwt, RevalidarToker);

module.exports = router;
