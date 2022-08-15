const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getApiTemperament } = require('../Controllers/TemperamentController');


const router = Router();

router.use('/',getApiTemperament)

module.exports = router;