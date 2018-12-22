const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");
// const nightmare = require("nightmare");
module.exports = app => {

    // When user searches a twitter user and the keyword this will create
    // a twitter user in the db and then associate all the tweets to that user
    app.get("/submit/:name/:keyword", (req, res) => {

        db.User.remove({}, () => {
            console.log("Users removed!");
        });
        db.Tweet.remove({}, () => {
            console.log("Tweets removed!");
        });


        const name = req.params.name;
        const keyword = req.params.keyword;
        const tweetObjectList = [];

        axios.get("https://twitter.com/search?l=&q=" + keyword + "%20from%3A" + name + "&src=typd").then(function(response) {
            // console.log(response);
            var $ = cheerio.load(response.data);

            $(".content").each((i, element) => {
                 //console.log(element)
                // console.log("hi")
                const tweet = $(element).children(".js-tweet-text-container").text();

                //console.log(tweet);
                let photo = $(element).find(".AdaptiveMedia-photoContainer").html();
                if (photo) {
                    photo = $.parseHTML(photo)[0].next.attribs.src;
                    //console.log(photo);
                }

                let profileImg =  $(element).find("a").html();
                profileImg =  $.parseHTML(profileImg)[0].next.attribs.src;

                let date = $(element).find(".js-short-timestamp").html();
                // console.log(date);
                // console.log(profileImg);
                // console.log(tweet);
                // console.log(photo);

                const tweetObject = {
                    tweet: tweet,
                    profileImg: profileImg,
                    date: date,
                    photoLink: photo
                }

                tweetObjectList.push(tweetObject);


            });

            res.json(tweetObjectList);


        });
    
    });

    app.post("/api/tweets", (req, res) => {
        console.log(req.body.name);
        db.User.create({name : req.body.name})
        .then(dbUser => {
            // If saved successfully, print the new Library document to the console
            console.log(dbUser);
          })
          .catch(function(err) {
            // If an error occurs, print it to the console
            console.log(err.message);
        });

        db.Tweet.create(req.body)
            .then(function(dbTweet) {
           
            return db.User.findOneAndUpdate({name : req.body.name}, { $push: { tweets: dbTweet._id } }, { new: true });
            })
            .then(function(dbUser) {
                res.json(dbUser);
            })
            .catch(function(err) {
            res.json(err);
        });

    });

    app.get("/", (req, res) => {
        console.log("hiiiiiii");
        //const user = req.params.user;
        db.Tweet.find({})
            .then(function(dbTweet) {
            console.log("This is the tweet" + dbTweet);
            // res.json(dbTweet);
            const hbsObj = {
                tweet: dbTweet
            }
            res.render("index", hbsObj)
            })

            .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
            });
        
    })


}