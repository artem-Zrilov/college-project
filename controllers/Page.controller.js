const Specialization = require('../models/Specialization');
const Doctor = require('../models/Doctor');
const Visit = require('../models/Visit');
const Record = require('../models/Record');
var dayjs = require('dayjs')

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

    async renderAccount(req) {

        const records = await Record.find({user: req.user._id});
        const listRecords = [];

        for (const record of records) {
            const visit = await Visit.findOne({_id: record.visit})
            const doctor = await Doctor.findOne({_id: record.doctor});

            listRecords.push({
                doctor: doctor.fullName,
                date: dayjs(visit.date).format('DD.MM.YYYY HH:mm')
            })
        }

        return {
            title: 'Личный кабинет',
            user: {
                firstName: req.user.firstName,
                secondName: req.user.secondName,
                isAdmin: req.user.isAdmin
            },
            records: listRecords
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

    async renderDoctorDetail(req, res) {
        try {
            const doctor = await Doctor.findOne({_id: req.params.id}).lean();
            const visits = await Visit.find({doctor: doctor._id, isBusy: false}).lean();

            res.render('doctor', {
                title: `Запись к ${doctor.fullName}`,
                doctor,
                visits: visits.map(visit => ({...visit, date: dayjs(visit.date).format('DD.MM.YYYY HH:mm')})),
                user: {
                    firstName: req.user.firstName,
                    secondName: req.user.secondName,
                    isAdmin: req.user.isAdmin
                }
            })
        } catch (e) {
            res.redirect('/')
        }
    }
}

module.exports = new PageController();
