// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;



app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.render('index.ejs');
});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port localhost:' + port);