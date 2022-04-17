const reviewService = require("../services/review.service")


module.exports = {
    addReviews : async (req, res) => {
        reviewService.addReview(req.body)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    },

    getReviews : async (req, res) => {
        reviewService.getReview(req.params)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    },

    updateReviews : async (req, res) => {
        reviewService.updateReview(req.params, req.body)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    }


}
