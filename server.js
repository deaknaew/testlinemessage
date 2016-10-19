var express = require('express');
var app = express();
var _ = require ('underscore');
var request = require('request');
var bodyParser = require("body-parser");
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
var access_token = 'y1opwsAwfAcHSwaQ7ZNfWUzm7G/sOBaqfS8tQq5ncEEKz8LhQa/n9fK3DbiEgihOhZ8Dn2ZXksYWYNAGqUZrrhe+u1nBGLJasfnnRiYzKVj02QHuayDVw4uPYJoiMlmsaWBdfmuLtRZhi7ISER/DPgdB04t89/1O/w1cDnyilFU='
var AuthorizationHeader = {
    "Content-Type":	'application/json',
    Authorization: 'Bearer ' + access_token
};
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set the home page route
app.get('/', function (req, res) {
    console.log(req.body);
    res.send('Hello World!');
});
app.post('/', function (req, res) {
    //console.log(req.body);
    if (req.body.events) {
        var events = req.body.events;
        var messages = _.filter(events, function (item) { return item.type == "message" });
        _.each(messages, function (message) {
            var resmsg = "";
            try {
                resmsg = eval(message.message.text);
            } catch (e) {

            }
            request({
                url: "https://api.line.me/v2/bot/message/reply",
                method: "POST",
                headers: AuthorizationHeader,
                body: JSON.stringify({
                    "replyToken": message.replyToken,
                    "messages": [
                        {
                            "type": "text",
                            "text": resmsg
                        }]
                })
            }, function (error, response, body) {
               if(error) console.log(error);
                res.send('OK');
            //res.send(body);
            });
        });
        
    }else
    res.send('OK');
});
//app.all('*', function (req, res,next) {
//    if (!req.body || !req.body.events) {
//        return next();
//    }
//    else if(req.body.events){
//        console.dir(req.body.events);
//        res.send('OK');
//    }
//});
app.get('/verify', function (req, res) {
    

    request({
        url: "	https://api.line.me/v1/profile",
        method: "GET",
        headers: AuthorizationHeader
    }, function (error, response, body) {
        //console.log(response);
        res.send(body);
    });
});

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});