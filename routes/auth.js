const { Router } = require('express');
// Router() retorna un router
const router = Router();

// .get() retorna una peticion hecha al servidor
// primer argumento es el path url, segundo argumento es un callback
// donde ira el retorno del get
router.get('/', (req, res) => {});

module.exports = router;
