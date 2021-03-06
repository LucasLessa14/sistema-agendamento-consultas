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

    async getAll(showFinished) {
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

    async getById(id) {
        try {
            var event = await Appo.findOne({ '_id': id });
            return event;
        } catch (err) {
            console.log(err);
        }
    }

    async finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, { finished: true });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async search(query) { // query => (email ou CPF)
        try {
            var appos = await Appo.find().or([{email: query},{cpf: query}])
            return appos;
        } catch (err) {
            console.log(err)
            return [];
        }
    }
}

module.exports = new AppointmentService();