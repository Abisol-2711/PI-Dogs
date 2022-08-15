const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogRouter = require('./DogRouter.js');
const TemperamentRouter = require('./TemperamentRouter.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs',DogRouter);
router.use('/temperaments',TemperamentRouter);


module.exports = router;
