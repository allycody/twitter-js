var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var styles = require('../public/stylesheets/style.css');
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

module.exports = function(io){

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true, addName: false} );
});

// router.get('/stylesheets/style.css', function (req, res, next){
// 	res.sendFile('/Users/Ally/Desktop/GHA/twitter-js/public/stylesheets/style.css');
// });
router.get('/users/:name', function(req, res, next){
	var findName = req.params.name;
	console.log(typeof findName);
	var filteredTweets = tweetBank.find(function(x){
		return x.name === findName;
	});
	res.render('index', {tweets: filteredTweets, showForm: true, addName: true, username: findName});
});

// router.get('/postnew/:myName/:myTweet', function(req, res, next){
// 	var newTweet = req.params.myTweet;
// 	var myname = req.params.myName;
// 	tweetBank.add(myname, newTweet);
// 	var tweets = tweetBank.list();
// 	res.render( 'index', { tweets: tweets } );
// });

router.get('/tweets/:id', function(req, res, next){
	var tweetID = parseInt(req.params.id);
	console.log(tweetID)
	var tweets = tweetBank.list();
	console.log(tweets[2].name, tweets[2].id);
	var filteredTweets = tweetBank.find(function(x){
		return x.id === tweetID;
	});
	console.log(filteredTweets);
	res.render('index', {tweets: filteredTweets});
});


router.post('/tweets', function(req, res, next) {
	var name = req.body.name;
	var text = req.body.text;
	tweetBank.add(name, text);
	res.redirect('/');
});

return router;
};

