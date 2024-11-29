// Creating router for menu items
const express = require("express");
const router = express.Router();

// Handling route to display the menu
router.get('/menu', function(req, res, next) {
    let sqlquery = "SELECT * FROM menu"; // query database to get all the menu items
    // executing sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        }
        res.render("menu.ejs", {menuItems: result});
     })
})

module.exports = router;