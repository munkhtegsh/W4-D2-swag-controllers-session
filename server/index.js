require('dotenv').config();
const express = require('express'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        checkForSession = require('./middlewares/checkForSession'),
        sc = require('./controllers/swag_controller'),
        ac = require('./controllers/auth_controller');
        cc = require('./controllers/cart_controllers');
        search_controller = require('./controllers/search_controller');

const app = express();
app.use(bodyParser.json());
app.use( express.static( `${__dirname}/build` ) );
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
}));

//here is checking user is created in session or not
app.use(checkForSession);

//swag_controllers
app.get('/api/swag', sc.read);

// auth_controllers
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

// cart_controllers
app.post('/api/cart', cc.add); //if you are using query, you don't need params
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.remove);

//search_controllers
app.get('/api/search', search_controller.search);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
