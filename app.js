var express = require('express');
var app = express();
var volleyball = require('volleyball');

app.listen(3000, function(){
	console.log("server listening");
});
// app.use(function(req, res, next){
// 	console.log(req.method);
// 	console.log(req.url);

// 	next();
// });

app.use(volleyball);

app.use('/special', function(req, res, next){
	res.send('you have reached the special area');
});

app.get('/', function(req, res, next){
	res.send('this is a response to GET\n');
});

app.get('/news', function(req, res, next){
	res.send('read all about it');
});