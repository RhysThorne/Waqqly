const express = require('express');
const router = express.Router();
const petsRoutes = require('./petRoutes');
const dogWalkersRoutes = require('./dogWalkerRoutes');

router.use('/pets', petsRoutes);
router.use('/dogwalkers', dogWalkersRoutes);

module.exports = router;