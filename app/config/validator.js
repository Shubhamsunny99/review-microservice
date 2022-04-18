const { Validator } = require('node-input-validator');

addReviewValidation = (req, res, next) => {
    const validate = new Validator(req.body, {
        userID        : "required|string",
        restuarantID  : "required|string",
        review        : "required|string",
        rating        : "required|integer"
    });
  
    validate.check().then((matched) => {
      if (!matched) {
        let key = Object.keys(validate.errors)[0]
        return res.json({
            status : 400,
            error : validate.errors[key].message
        })
      } else {
        next()
      }
    }).catch((err) => {
        return res.json({
            status : 400,
            error : err
        })
    })
};

  module.exports = {
    addReviewValidation : addReviewValidation
  }