const { Router } = require('express');
// Router() retorna un router
const router = Router();
const { check } = require('express-validator');

const { validarjwt } = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');

const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/events');
const isDate = require('../helpers/isDate');

// ya que todos los endpoints emplean "validarjwt" y es un middleware
// entonces podemos enviar "validarjwt" al metodo "use" y se aplicara
// el middleware a todos los endpoints que esten despues
router.use(validarjwt);

router.get('/', getEventos);

// el metodo custom() permite crear nuestra propias validaciones,
// recibe el middleware propio
router.post(
	'/',
	[
		check('title', 'el titulo es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha de fin es obligatoria').custom(isDate),
		validarCampos,
	],
	crearEvento
);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
