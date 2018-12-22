const API = {
    saveTweet: function(tweets) {
        $.ajax({
            type: "POST",
            url: "/api/tweets",
            data: tweets
        }).then(result => {
            //console.log("hi" + result)
        })
    },

    getTweets: function(user) {
        $.ajax({
            type: "GET",
            url: "/tweets/" + user,
        }).then(result => {
            window.location.href = result;
        })

    }
}


const removeWhiteSpace = (string) => {
    return string.replace(/\s/g, '');
    
    
}

$("#submit").on("click", () => {

    const name = removeWhiteSpace($("#name").val());

    const keyword = $("#keyword").val();


    // Api get route to get the tweets
    $.ajax({
        type: "GET",
        url: "/submit/" + name + "/" + keyword,

    }).then((tweets) => {
        console.log(tweets);
        for (var i = 0; i < tweets.length; i++) {
            tweets[i].name = name;
            console.log(tweets[i]);
            API.saveTweet(tweets[i]);
          }
        location.reload();
        
    // and then api post route to add it to mongoDB
    });

    

    // After its added, call a refresh examples to get the tweets and
    // render them to the page


})



