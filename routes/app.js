const { Router } = require('express');
const pageController = require('../controllers/Page.controller');
const router = Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login'
}), async (req, res) => {
    res.render('index', await pageController.renderIndex());
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Вход'
    });
});

router.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Регистрация'
    });
});

module.exports = router;
