const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/agendamento', {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/cadastro', (req, res) => {
    res.render('create');
})

app.listen(8409, () => {
    console.log('Servidor rodando na porta 8409');
})