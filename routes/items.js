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

module.exports = router;