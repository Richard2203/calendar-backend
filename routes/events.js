const { Router } = require('express');
// Router() retorna un router
const router = Router();
const { validarjwt } = require('../middlewares/validar-jwt');

const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/events');

// ya que todos los endpoints emplean "validarjwt" y es un middleware
// entonces podemos enviar "validarjwt" al metodo "use" y se aplicara
// el middleware a todos los endpoints que esten despues
router.use(validarjwt);

router.get('/', getEventos);
router.post('/', crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;
