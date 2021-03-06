const express = require("express");
const reviewController = require("../controllers/review.controller");
const Validation = require('../config/validator')


const reviewRoutes = express.Router();

// /review is prefix from app/index.js 
reviewRoutes.post('/add-review', Validation.addReviewValidation, reviewController.addReviews)

reviewRoutes.get('/get-review/:id', reviewController.getReviews)

reviewRoutes.put('/update-review/:id', reviewController.updateReviews)

reviewRoutes.get('/average-rating', reviewController.averageRatings)

reviewRoutes.get('/fetch-review-by-restuarant/:id' , reviewController.fetchReviewByRestuarantID)


module.exports = reviewRoutes
