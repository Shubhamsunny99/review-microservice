const express = require("express");
const reviewController = require("../controllers/review.controller");


const reviewRoutes = express.Router()

// /review is prefix from app/index.js 
reviewRoutes.post('/add-review', reviewController.addReviews)

reviewRoutes.get('/get-review/:id', reviewController.getReviews)

reviewRoutes.put('/update-review/:id', reviewController.updateReviews)


module.exports = reviewRoutes
