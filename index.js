// Importing the modules
const express = require ('express');
const ejs = require('ejs');
const session = require ('express-session');
const validator = require('express-validator');
const expressSanitizer = require('express-sanitizer');
const mysql = require('mysql2');

// Creating the express application object
const app = express();
const port = 8000;

// Telling Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Setting up the body parser
app.use(express.urlencoded({ extended: true }));

// Setting up public folder (for css and statis js)
app.use(express.static('public'));

// Creating a session
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Setting up the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'umairs_restaurant_app',
    password: 'restaurant123',
    database: 'umairs_restaurant'
});

// Connecting to the database
db.connect((err) => {
    if (err) {
        console.log('Error connecting to database', err);
    }
    else {
        console.log('Connected to the database');
    }
});
global.db = db; // Making the database accessible for all routes

// Loading the route handlers for index and about pages
const mainRoutes = require("./routes/main");
app.use('/', mainRoutes);

// Starting the server on port 8000
app.listen(port, () => {
    console.log('Node app listening on port 8000!');
});