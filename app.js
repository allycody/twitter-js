var express = require('express');
var app = express();
var volleyball = require('volleyball');
var nunjucks = require('nunjucks');
var routes = require('./routes/')
var bodyParser = require('body-parser');
var socketio = require('socket.io');


var server = app.listen(3000, function(){
	console.log("server listening");
});
var io = socketio.listen(server);
// app.use(function(req, res, next){
// 	console.log(req.method);
// 	console.log(req.url);

// 	next();
// });

var people = [{name: 'Grace'}, {name: 'Cara'}, {name: 'Ally'}];
var locals = {title: 'List of People', people: people, closing: 'this is the end of our web page'};
//var responseNunjucks = nunjucks.render('views/index.html', {title: 'List of People', people: people});
//var responseNunjuscks = app.render();
nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.use(volleyball);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', routes(io));
app.use(express.static('public'));

// app.use('/special', function(req, res, next){
// 	res.send('you have reached the special area');
// });

// app.get('/', function(req, res, next){
// 	//res.send('this is a response to GET\n');
// 	res.render('index', locals);
// });

// app.get('/news', function(req, res, next){
// 	res.send('read all about it');
// });