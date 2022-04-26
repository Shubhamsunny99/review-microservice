// Business logic
// Database etc 

const Review = require("../models/review");

module.exports = {
    
    addReview: async (body) => {
        return new Promise(async(resolve, reject) => {
            const reviewObj = {
                userID       : body.userID,
                restuarantID : body.restuarantID,
                review       : body.review,
                rating       : body.rating,
            }

            await Review.findOne({$and : [{userID : body.userID}, {restuarantID: body.restuarantID}]})
                .then(async custmerD => {
                    if(custmerD){
                        return reject("Review And Rating Already Exist For This Resuarant")
                    }
                    return await Review.create(reviewObj)
                })
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },

    getReview: async (params) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id

            await Review.findOne({_id : _id})
                .then(async reviewD => {
                    if(!reviewD){
                        return reject("Review Not Exist")
                    }
                    return resolve(reviewD)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },

    updateReview: async (params, body) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id;

            const reviewObj = {
                userID       : body.userID,
                restuarantID : body.restuarantID,
                review       : body.review,
                rating       : body.rating,
            }

            await Review.findOne({$and : [{userID : body.userID}, {restuarantID: body.restuarantID}]})
                .then(async reviewD => {
                    if(reviewD){
                        if(reviewD._id !== _id){
                            return reject("Email or Mobile is Already taken")
                        }
                    }
                    return await Review.updateOne({_id : _id} , reviewObj)
                })
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    averageRating: async () => {
        return new Promise(async(resolve, reject) => {
            Review.aggregate([
                {
                    $group:
                    {
                    "_id":"restuarantID",
                    AverageValue: { $avg: "$rating" }
                    }
                }
            ])
            .then(review_D => {
                return resolve(review_D)

            }).catch(err => {
                return reject(err)
            })

        })
    }
}