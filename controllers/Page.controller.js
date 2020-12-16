const Specialization = require('../models/Specialization');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

class PageController {
    async renderIndex(req, res) {
        const specializationsResponse = await Specialization.find().lean();
        const specializations = {
            global: specializationsResponse.filter(item => !item.parentId),
            children: {}
        }

        specializationsResponse.forEach((item) => {
            if (item.parentId && Array.isArray(specializations.children[item.parentId])) {
                specializations.children[item.parentId].push(item);
            } else if (item.parentId) {
                specializations.children[item.parentId] = [item];
            }
        })

        const doctors = await Doctor.find().lean();

        return {
            title: 'Запись на прием',
            user: {
                firstName: req.user.firstName,
                secondName: req.user.secondName,
                isAdmin: req.user.isAdmin
            },
            specializations,
            doctors
        }
    }

    async renderAccount(req, res) {
        return {
            title: 'Личный кабинет',
            user: {
                firstName: req.user.firstName,
                secondName: req.user.secondName,
                isAdmin: req.user.isAdmin
            }
        }
    }

    async renderAdmin(req, res) {
        if (!req.user.isAdmin) {
            res.redirect('/');
            return;
        }

        res.render('admin', {
            title: 'Административная панель'
        })
    }
}

module.exports = new PageController();
