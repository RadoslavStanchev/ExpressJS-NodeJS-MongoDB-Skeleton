const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

router.get('/', (req, res) => {
    res.send('Auth Controller');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    authService.login(username, password)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true});

            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', 
    body('password-repeat')
        .trim()
        .custom((value, {req}) => {
            if(value != req.body.password) {
                return Promise.reject('Password mismatch!')
            } else {
                return true;
            }
        }),
    (req, res, next) => {
        let errors = validationResult(req).array();

        if (errors.length > 0) {
            let error = errors[0]
            error.message = error.msg;

            return next(error)
        }
        const { username, password } = req.body;

        authService.register(username, password)
            .then(createdUser => {
                console.log('createdUser')
                console.log(createdUser)
                res.redirect('/auth/login');
            })
            .catch(next)
    }
)

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
})

module.exports = router;