const router = require('express').Router();
const isAuth = require('../middlewares/isAuthorized');

router.get('/', (req, res) => {
    // res.render('home', {name: 'Pesho'}
    res.render('home');
})

router.get('/secret-action', isAuth, (req, res) => {
    res.send('secret content')
})

module.exports = router;