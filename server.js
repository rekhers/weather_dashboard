var express = require('express');
var app = express();
var http = require('http').Server(app);

// app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
	res.render('index');
	app.use("/public", express.static(__dirname + '/public'));

});

var port = process.env.PORT || 3000;
   
http.listen(port);

  
