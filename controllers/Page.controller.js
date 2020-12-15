const Specialization = require('../models/Specialization');
const Doctor = require('../models/Doctor');

class PageController {
    async renderIndex() {
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
            specializations,
            doctors
        }
    }
}

module.exports = new PageController();
