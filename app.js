var express = require('express');
var app = express();
var path = require('path');
var task = require('./routes/task');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/task', task);

// Catch-all route for static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

//app.get('/*', function(req, res) {
//    var file = req.params[0] || '/views/index.html';
//    res.sendFile(path.join(__dirname, '/', file));
//});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});