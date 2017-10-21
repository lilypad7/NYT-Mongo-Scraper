// Liliana Cortes

// Dependencies & requirements
var express = require("express");
var mongojs = require('mongojs')
var bodyParser = require("body-parser");
var hbs = require('hbs');
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

//require usermodel
var savedArticle = require("./userModel.js");

//initialize express
var app = express();

//use body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//use public folder
app.use(express.static("public"));

//database config
var databaseURL = "nytimes";
var collections = ["scrapedData"];
mongoose.connect("mongodb://localhost/nytimes");
var db = mongoose.connection;

//hook mongojs config to the db variable
var db = mongojs(databaseURL, collections);
db.on("error", function(error){
    console.log("Database Error:", error);
});

//main route
app.get("/", function(req, res){
    res.send(index.html);
});

//retrieved data from the db
app.get("/saved", function(req, res){
    db.scrapedData.find({}, function(error, found){
        if(error){
            console.log(error);
        }
        else {
            res.json(found);
        }
    });
});

//scrape data from nytimes and into mongodb
app.get("/scrape", function(req, res) {
    // Make a request for the news section of ycombinator
    request("https://www.nytimes.com/", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $(".story-heading").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
  
        // If this found element had both a title and a link
        if (title && link) {
          // Insert the data in the scrapedData db
          db.scrapedData.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
        }
      });
    });

//save an article to our mongoDB
app.post("/saved", function(req, res) {
    var user = new savedArticle(req.body);
    user.save(function(error, doc){
        if(error){
            res.send(error);
        } else {
            res.send(doc);
        }
    });
});
  
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });
  
  
  // Listen on port 3000
  app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  