var request = require('request');
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
// fs lets us read a data file in our project folder
var url = require('url');


var app = express();

app.set('view engine', 'ejs');

// tell your app to use the module, this is setting a specific parameter for body-parser
app.use(bodyParser.urlencoded({extended: false}));



// This is how you get data from a local file on the default localhost:3000
app.get('/', function(req, res) {
 var cereals = fs.readFileSync('./data.json');
 cereals = JSON.parse(cereals);
 res.render('./cereals/index', {cereals: cereals})
});


// This is what you get when you go to localhost:3000/google
// This is also what it would look lik to query an api
app.get('/google',function(req,res) {
  request('http://www.google.com', function(error,response,body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});


app.get('/foo', function(req,res){
  res.send("There is no foo route. You foo. You havent created it.");
});


// The page reads this last, it catches any weird thing "wild card" typed after 3000 
// that doesnt match a specified route - ex. "localhost:3000/viper"
app.get('*', function(req,res){
  // do something
  // res.send("No route for this");
  // res.redirect("www.theCorrectSiteName.com");
});




app.listen(3000);