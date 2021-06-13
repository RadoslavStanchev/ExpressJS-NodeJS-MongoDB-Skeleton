const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');


//Controllers

router.use('/', homeController);
router.use('/auth', authController);

//User controller

module.exports = router;