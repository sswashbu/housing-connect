const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', '../public');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    let text = "Button";
    response.render('index', { text });
});

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.render('index', { });
});

exports.app = functions.https.onRequest(app);
