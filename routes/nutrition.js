// This file defines the routes for the nutritional information API (API Ninjas)
const express = require('express');
const router = express.Router();
const axios = require('axios'); // Use axios for making HTTP requests as request is outdated

// Handling the nutrition page
router.get('/', (req, res) => {
    res.render('nutrition'); // Displays page for user to search for nutritional information
});
router.post('/search', (req, res, next) => {
    let item = req.body.query; // Assigning user input to item
    let url = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(item)}`;
    // Making a GET request to the API
    axios.get(url, { headers: { 'X-Api-Key': '4r3sGBRY4X0BM79J+4ZsMA==yGBBfoKUnS0N6x2v' } })
        .then((response) => {
            if (response.data.length > 0) { // If there's a match, the nutritional information is displayed
                res.render('./nutrition_result', { item, nutrition: response.data[0] });
            } else {
                res.render('nutrition_result', { item, nutrition: null }); // Informing user that no match was found
            }
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
