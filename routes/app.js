const { Router } = require('express');
const pageController = require('../controllers/Page.controller');
const router = Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login'
}), async (req, res) => {
    res.render('index', await pageController.renderIndex(req, res));
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

router.get('/account', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login'
}), async (req, res) => {
    res.render('account', await pageController.renderAccount(req, res));
});

router.get('/account/change', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login'
}), async (req, res) => {
    res.render('account-change', await pageController.renderAccount(req, res));
});

router.get('/admin', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login'
}), pageController.renderAdmin);

module.exports = router;
