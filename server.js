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
app.post('/', function (req, res) {
    console.log(req);
    res.send('OK');
});
app.get('/verify', function (req, res) {
    var access_token='y1opwsAwfAcHSwaQ7ZNfWUzm7G/sOBaqfS8tQq5ncEEKz8LhQa/n9fK3DbiEgihOhZ8Dn2ZXksYWYNAGqUZrrhe+u1nBGLJasfnnRiYzKVj02QHuayDVw4uPYJoiMlmsaWBdfmuLtRZhi7ISER/DPgdB04t89/1O/w1cDnyilFU='
    var myJSONObject = {
        Authorization:'Bearer '+ access_token
    };
    request({
        url: "	https://api.line.me/v1/profile",
        method: "GET",
        headers: myJSONObject
    }, function (error, response, body) {
        //console.log(response);
        res.send(body);
    });
});

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});