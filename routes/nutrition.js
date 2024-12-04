// This file defines the routes for the nutritional information API (API Ninjas)
const express = require('express');
const router = express.Router();
const axios = require('axios'); // Use axios for making HTTP requests as request is outdated

// Handling route for nutritional information
router.get('/', function (req, res, next) {
    let item = req.query.query || 'apple';
    let url = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(item)}`; 

    // Making the GET request to the calorie API
    axios.get(url, { headers: {'X-Api-Key': '4r3sGBRY4X0BM79J+4ZsMA==yGBBfoKUnS0N6x2v'}}) // API key for the calorie API 
    .then((response) => {
        if (response.data.length > 0) {
            // Extracting the nutritional information from the response
            let info = response.data[0];
            let nutrition = `
                <h3>Nutritional Information for ${item} per 100g:</h3>
                <p><strong>Total Fat (g):</strong> ${info.fat_total_g}</p>
                <p><strong>Saturated Fat (g):</strong> ${info.fat_saturated_g}</p>
                <p><strong>Sodium (mg):</strong> ${info.sodium_mg}</p>
                <p><strong>Potassium (mg):</strong> ${info.potassium_mg}</p>
                <p><strong>Cholesterol (mg):</strong> ${info.cholesterol_mg}</p>
                <p><strong>Carbohydrates (g):</strong> ${info.carbohydrates_total_g}</p>
                <p><strong>Fiber (g):</strong> ${info.fiber_g}</p>
                <p><strong>Sugar (g):</strong> ${info.sugar_g}</p>
            `;
            res.send(nutrition); // Nutritional information is displayed
        } else {
            res.send('We could not find any nutritional inforation for that item'); // Informs user if no information is found
        }
    })
    .catch((err) => {
        next(err);  // Handling errors
    });
});

module.exports = router;
