// Creating router for users to login/logout and register
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); // Importing bcrypt to securely store passwords by hashing them
const saltRounds = 10;
const { check, validationResult } = require('express-validator'); // Importing express-validator to check if inputs are valid

// Handling route to register an account
router.get('/register', function (req, res, next) {
    res.render('register/register.ejs');                                                               
})    
// The following checks ensure that email and password are valid, and that first, last, and username are not empty
router.post('/registered', [check('email').isEmail(), check('password').isLength({ min: 10 }), check('first').notEmpty(), check('last').notEmpty(), check('username').notEmpty()], function (req, res, next) {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {
        res.render('register/register_error');  // If there are errors, user is informed and prompted to try again
    }
    else {
        const plainPassword = req.sanitize(req.body.password); // Sanitizing the password to prevent harmful attacks
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) { // Hashing the password
            let sqlquery = "INSERT INTO users (username, first, last, email, hashedPassword) VALUES (?, ?, ?, ?, ?)";
            
            // Sanitizing the inputs to prevent harmful attacks
            let first = req.sanitize(req.body.first);
            let last = req.sanitize(req.body.last); 
            let email = req.sanitize(req.body.email);   
            let username = req.sanitize(req.body.username);

            // Excecuting SQL query
            db.query(sqlquery, [username, first, last, email, hashedPassword], (err, result) => {
                if (err) {
                    next(err);
                }
                res.render('register/user_registered', {first}); // If successful, user is informed that they have been registered
            })                                                                           
        })
    }
})  

// Handling route to login
router.get('/login', function (req, res, next) {
    if (req.session.userId) { // Checking if user is already logged in
        res.render('login/login_again', {username: req.session.userId}); // If user is already logged in, they are informed and prompted to logout
    }
    else {
        res.render('login/login.ejs'); // If user is not logged in, they are prompted to login
    }
});
router.post('/loggedin', function (req, res, next) {
    let sqlquery = "SELECT hashedPassword FROM users where username = ?";
    db.query(sqlquery, [req.sanitize(req.body.username)], (err, result) => { // sanitizing the username to prevent harmful attacks
        if (err){
            next(err);
        }
        if (result.length == 0) {
            return res.render('login/login_error'); // If username is not found, user is informed and prompted to try again
        }
        let hashedPassword = result[0].hashedPassword;
        // Comparing the password supplied with the password in the database
        bcrypt.compare(req.sanitize(req.body.password), hashedPassword, function(err, result) { // sanitizing the password to prevent harmful attacks
            if (result == true) {
                // Saving user session here, when login is successful
                req.session.userId = req.sanitize(req.body.username);
                res.render('login/loggedin', {username: req.sanitize(req.body.username)}); // If password is correct, user is informed that they are logged in
            }
            else {
                res.render('login/login_error'); // If password is incorrect, user is informed and prompted to try again
            }
        })
    })
})

// Handling route to logout
router.get('/logout', function (req, res, next) {
    if (!req.session.userId) { // Checking if user is logged in
        res.render('logout/logout_error'); // If user is not logged in, they are informed that they cannot log out and prompted to login
    }
    else {
        req.session.destroy(); // If user is logged in, their session is destroyed
        res.render('logout/loggedout'); // User is informed that they have been logged out
    }
})

module.exports = router;

