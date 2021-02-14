const appointmentFactory = require('../factories/AppointmentFactory');
const appointment = require('../models/Appointment');
const mongoose = require('mongoose');

const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {

    async create(name, email, description, cpf, date, time) {

        const newAppo = new Appo({ name, email, description, cpf, date, time, finished: false });

        try {
            await newAppo.save();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async GetAll(showFinished) {
        if (showFinished) {
            return await Appo.find();
        } else {
            var appos = await Appo.find({ 'finished': false });
            var appointments = [];

            appos.forEach(appointment => {
                if (appointment.date != undefined)
                    appointments.push(appointmentFactory.Build(appointment));
            });

            return appointments;
        }
    }
}

module.exports = new AppointmentService();