// Creating router for my API
const express = require("express");
const router = express.Router();

// Handling route for API to display all menu items
router.get('/', function (req, res, next) {

    // Querying the database to get all the items from the menu
    let sqlquery = "SELECT * FROM menu";

    // Executing the sql query
    db.query(sqlquery, (err, result) => {
        // Returning results as a JSON object
        if (err) {
            res.json(err);
            next(err);
        }
        else {
            res.json(result); // Displaying the menu items
        }
    });
});

// Handling route to use API to search for items
router.get('/search', function (req, res, next) {

    // Querying the database to get all the matching items from the menu
    let sqlquery = "SELECT * FROM menu WHERE name LIKE '%" + req.query.item + "%'";

    // Executing the sql query
    db.query(sqlquery, (err, result) => {
        // Returning results as a JSON object
        if (err) {
            res.json(err);
            next(err);
        }
        else {
            res.json(result); // Displaying the search results
        }
    });
});

module.exports = router;