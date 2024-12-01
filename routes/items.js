// Creating router for menu items
const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator'); // Importing express-validator for checking price is valid

// Handling route to display the menu
router.get('/', function(req, res, next) {
    let sqlquery = "SELECT * FROM menu"; // query database to get all the menu items
    // executing sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        }
        res.render("menu.ejs", {menuItems: result}); // displaying the menu items
     })
})

// Handling route to display the vegan menu
router.get('/vegan', function(req, res, next) {
    let sqlquery = "SELECT * FROM menu WHERE vegan = true"; // query database to get all the vegan items
    // executing sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        }
        res.render("vegan.ejs", {menuItems: result}); // displaying the vegan items
     })
})

// Handling route to display the saver menu
router.get('/saver', function(req, res, next) {
    let sqlquery = "SELECT * FROM menu WHERE price < 3"; // query database to get all items under £3
    // executing sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        }
        res.render("saver.ejs", {menuItems: result}); // displaying the saver items
     })
})

// Handling route to search for items
router.get('/search',function(req, res, next){
    res.render("search.ejs");
})
router.get('/search_result', function (req, res, next) {
    // Sanitizing the search to prevents harmful attacks
    sanitizedText = req.sanitize(req.query.search_text);

    // Search the database
    let sqlquery = "SELECT * FROM menu WHERE name LIKE '%" + sanitizedText + "%'"; // query database to get result
    // execute sql query
    db.query(sqlquery, (err, result) => { // selecting matching items
        if (err) {
            next(err);
        }
        res.render("search_results.ejs", {menuItems: result}); // displaying the search results
     }) 
})

// Handling route to add a new item to menu
router.get('/add', function (req, res, next) {
    res.render('add.ejs');
})
router.post('/itemadded', [check('price').isDecimal(), check('name').notEmpty()], function (req, res, next) { // checks if price is a valid decimal and name isn't empty
    // Sanitiizing the input to prevent harmful attacks
    let name = req.sanitize(req.body.name);
    let price = req.sanitize(req.body.price);
    let vegan = req.body.vegan === 'true'; // converting to boolean

    // Checking if inputs were valid using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty() || price < 0) { // ensures price isn't negative
        // Makes user input data again if invalid
        res.render('add_error.ejs');
    }

    // saving data in database
    let sqlquery = "INSERT INTO menu (name, price, vegan) VALUES (?,?,?)"
    // executing sql query
    let newrecord = [name, price, vegan];
    db.query(sqlquery, newrecord, (err, result) => { // adding item to menu
        if (err) {
            next(err);
        }
        else
        res.render('item_added.ejs', { name: name, price: price, vegan: vegan });
    })
}) 

module.exports = router;