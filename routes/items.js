// Creating router for menu items
const express = require("express");
const router = express.Router();

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
    res.render("search.ejs")
})
router.get('/search_result', function (req, res, next) {
    // Search the database
    let sqlquery = "SELECT * FROM menu WHERE name LIKE '%" + req.query.search_text + "%'"; // query database to get result
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        }
        res.render("search_results.ejs", {menuItems: result}); // displaying the search results
     }) 
})

module.exports = router;