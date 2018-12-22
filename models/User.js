const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: "Username is Required"
    },

    tweets: [
        {
          // Store ObjectIds in the array
          type: Schema.Types.ObjectId,
          // The ObjectIds will refer to the ids in the Note model
          ref: "Tweet"
        }
      ]
    });

    const User = mongoose.model("User", UserSchema);

    module.exports = User;

    