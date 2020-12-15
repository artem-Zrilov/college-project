const Doctor = require('../models/Doctor');

class DoctorController {
    async filterBySpecialization(specialization) {
        const doctors = Doctor.find({specialization}).lean()

        return doctors
    }
}

module.exports = new DoctorController();
