var express = require('express');
var app = express();
var request = require('request');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {
    
    res.send('Hello World!');
});

app.get('/verify', function (req, res) {
    
    res.send('verify');
});

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});