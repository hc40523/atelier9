var express = require('express');
var app = express();
app.set('view engine', 'ejs');

const modMax = 6;
var mesModules = [
    false,
    false,
    false,
    false,
    false,
    false
]

app.get('/contact', function (req, res) {
    res.render('pages/contact');
});

app.get('/module/:num', function (req, res) {
    if (req.params.num <= modMax) {
        var a = mesModules[req.params.num];
        mesModules[req.params.num] = !a
        res.render('pages/module', { modnum: req.params.num, modState: mesModules[req.params.num] });
    }
    else {
        res.send('Le module spécifié est introuvable...')
    }
});

app.get('/reset', function (req, res) {
    for (let i = 0; i < (modMax + 1); i++) {
        mesModules[i] = false;
    }
    res.render('pages/controls', { modTab: mesModules });
});

app.get('/controls', function (req, res) {
    res.render('pages/controls', { modTab: mesModules });
});

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.use(function (req, res) {
    res.status(404);
    res.render('pages/notfound');
});

app.listen(8080);