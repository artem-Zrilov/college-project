const Doctor = require('../models/Doctor');
const Record = require('../models/Record');
const Visit = require('../models/Visit');

class DoctorController {
    async filterBySpecialization(specialization) {
        const doctors = Doctor.find({specialization}).lean()

        return doctors
    }

    async makeRecord(req, res) {
        const record = new Record({
            doctor: req.body.doctor,
            visit: req.body.visit,
            user: req.user._id
        })
        const visit = await Visit.findById(req.body.visit);

        visit.isBusy = true;

        try {
            await record.save();
            await visit.save();
            res.status(200).json(true)
        } catch (e) {
            res.status(401).json(false)
        }
    }
}

module.exports = new DoctorController();
