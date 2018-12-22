const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    name: {
        type:String,
        required: true
    },

    profileImg: {
        type: String,
        trim: true,
        required: true
    },

    photoLink: {
        type:String,
        
    },

    tweet: {
        type: String,
        trim: true,
        required: true
    },

    date: {
        type: String,
        trim: true,
        required: true
    },

});

const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = Tweet;