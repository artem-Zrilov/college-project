const { Router } = require('express');
const doctorController = require('../controllers/Doctor.controller');
const userController  = require('../controllers/User.controller');
const router = Router();

router.post('/doctors',async (req, res) => {
    res.json(await doctorController.filterBySpecialization(req.body.specialization));
})

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
