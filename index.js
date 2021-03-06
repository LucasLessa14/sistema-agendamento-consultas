const mongoose = require('mongoose');
const express = require('express');
const app = express();
const AppointmentService = require('./services/appointmentService');

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/agendamento', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/cadastro', (req, res) => {
    res.render('create');
})

app.post('/create', async (req, res) => {
    var status = await AppointmentService.create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    );

    if (status) {
        res.redirect('/')
    } else {
        res.send('Ocorreu um erro!');
    }
});

app.get('/getcalendar', async (req, res) => {
    var appointments = await AppointmentService.getAll(false);

    res.json(appointments);
});

app.get("/event/:id", async (req, res) => {
    var appointment = await AppointmentService.getById(req.params.id);
    console.log(appointment);
    res.render("event", { appo: appointment });
});

app.post('/finish', async (req, res) => {
    var id = req.body.id;
    var result = await AppointmentService.finish(id);
    res.redirect('/');
});

app.get('/list', async (req, res) => {

    // await AppointmentService.search();
    var appos = await AppointmentService.getAll(true);
    res.render("list", { appos });
});

app.get('/serchresult', async (req, res) => {
    var appos = await AppointmentService.search(req.query.search);
    res.render("list", { appos });
})

app.listen(8409, () => {
    console.log('Servidor rodando na porta 8409');
});