var express = require('express');
var app = express();
var volleyball = require('volleyball');
var nunjucks = require('nunjucks');

app.listen(3000, function(){
	console.log("server listening");
});
// app.use(function(req, res, next){
// 	console.log(req.method);
// 	console.log(req.url);

// 	next();
// });
var people = [{name: 'Grace'}, {name: 'Cara'}, {name: 'Ally'}];
//var responseNunjucks = nunjucks.render('views/index.html', {title: 'List of People', people: people});
//var responseNunjuscks = app.render();
nunjucks.configure('views');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.use(volleyball);

app.use('/special', function(req, res, next){
	res.send('you have reached the special area');
});

app.get('/', function(req, res, next){
	//res.send('this is a response to GET\n');
	res.render('index.html', {title: 'List of People', people: people});
});

app.get('/news', function(req, res, next){
	res.send('read all about it');
});