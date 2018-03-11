const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require("body-parser");
const engines = require('consolidate');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceKey");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://housingconnect-3abbc.firebaseio.com"
});

/** Set up express server with handlebars renderer */
const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.engine('hbs', engines.handlebars);
app.set('views', '../public');
app.set('view engine', 'hbs');
// app.engine('html', engines.hogan);
// app.set('views', '../public');
// app.set('view engine', 'html');

/** Render main application page */
app.get('/', (request, response) => {
    // response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.render('index', {});
});

/** Render login page */
app.get('/login', (request, response) => {
    // response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.render('login', {});
});

/** Verify session authentication token when login is requested */
app.post('/authenticate', (request, response) => {
    admin.auth().verifyIdToken(request.query.token).then(decodedToken => {
        let uid = decodedToken.uid;
        admin.auth().getUser(uid).then(userRecord => {
            response.status(200).send("Authorized");
        }).catch(error => {
            response.status(401).send("Unauthorized");
        })
    }).catch(error => {
        response.status(401).send("Unauthorized");
    });
});

exports.app = functions.https.onRequest(app);
