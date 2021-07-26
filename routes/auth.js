const { Router } = require('express');
const { loginUser, RevalidarToker, newUser } = require('../controllers/auth');

// Router() retorna un router
const router = Router();

// .get() retorna una peticion hecha al servidor
// primer argumento es el path url, segundo argumento es un callback
// donde ira el retorno del get
router.post('/new', newUser);

router.post('/', loginUser);

router.get('/renew', RevalidarToker);

module.exports = router;
