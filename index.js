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

// Loading the route handlers
const mainRoutes = require("./routes/main");
app.use('/', mainRoutes);

// Setting up public folder (for css and statis js)
app.use(express.static('public'));

// Starting the server on port 8000
app.listen(port, () => {
    console.log('Node app listening on port 8000!');
});