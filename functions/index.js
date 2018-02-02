const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const admin = require('firebase-admin');

admin.initializeApp(
    functions.config.firebase
);

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', '../public');
app.set('view engine', 'hbs');
// app.engine('html', engines.hogan);
// app.set('views', '../public');
// app.set('view engine', 'html');

app.get('/', (request, response) => {
    // response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.render('index', {});
});

app.get('/login', (request, response) => {
    // response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.render('login', {});
});

app.get('/authenticate', (request, response) => {
    admin.auth().verifyIdToken(request.query.token).then(decodedToken => {
        response.status(200).send("Authorized");
    }).catch(error => {
        response.status(401).send("Unauthorized");
    });
});

exports.app = functions.https.onRequest(app);
