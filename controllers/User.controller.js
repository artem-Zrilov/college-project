const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

class UserController {
    async register(req, res) {
       const candidate = await User.findOne({ login: req.body.login} ).lean();

       if (candidate) {
           res.status(409).json({
               message: 'Пользователь с данным логином уже зарегестрирован'
           })
       } else {
           const salt = bcrypt.genSaltSync(10);
           const password = bcrypt.hashSync(req.body.password, salt);
           const user = new User({
               firstName: req.body.firstName,
               secondName: req.body.secondName,
               login: req.body.login,
               password
           });

           try {
               await user.save();
               res.status(201).json(user);
           } catch (e) {

           }
       }
    }

    async login (req, res) {
        const user = await User.findOne({login: req.body.login});

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                login: user.login,
                id: user._id
            }, config.jwt.secret, config.jwt.options);
            console.log(token)
            res
                .cookie('jwt', token, config.jwt.cookie)
                .json({
                    token
                });
        } else {
            res.status(401).json({
                message: 'Не верный логин или пароль'
            })
        }
    }

}

module.exports = new UserController();
