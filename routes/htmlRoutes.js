module.exports = app => {

    app.get("/", function(req, res) {
        //console.log(db);
        res.render("index", {
            msg: "Welcome!",
        });
      });







}