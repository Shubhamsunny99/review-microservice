const mongoose = require('mongoose'),
      {Schema} = mongoose;

let table = new Schema(
  {
      userID: {
          type: Schema.Types.ObjectId,
          default: null
      },
      restuarantID:{
          type: Schema.Types.ObjectId,
          default : null
      },
      review:{
          type: String,
          default : null,
          lowercase: true
      }, 
      rating: {
          type: Number
      }
  },
  {
      timestamps: {
          createdAt: 'createdAt',
          updatedAt: 'updatedAt'
      },
  }
);

// module.exports = table
module.exports = mongoose.model(`reviews`, table);