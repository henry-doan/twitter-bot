var Twit  = require('twit');
var request = require('request');
var fs = require('fs');
var Cred = require('./credentials.js');
var csvparse = require('csv-parse');
var rita = require('rita');
var inputText = 'I went to the car. The care went to the store. Ralph went swimming.';


// be sure to npm or yarn install csvparse and rita

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
});

// testing code
// var markov = new rita.RiMarkov(3);
// markov.loadText(inputText);
// var sentences = markov.generateSentences(1);
// markov.getProbabilitie('word') see the odds of a word
// markov.getProbabilities('word') see the odds of the next word
// console.log(sentences);

var filePath = 'PATH TO TWEETS';

/*
	this will post a tweet that sounds like you from previous tweets in the file of tweets.
*/
var tweetData = fs.createReadStream(filePath)
.pipe(csvparse({delimiter: ','}))
.on('data', function(row){
	console.log(row[5]);
	inputText = inputText + ' ' + cleanText(row[5]);
})
.on('end', function() {
	var markov = new rita.RiMarkov(3);
	markov.loadText(inputText);
	var sentence = markov.generateSentences(1);
	bot.post('statuses/update', {status: sentence}, function(err, data, response) {
		if (err){
			console.log(err);
		} else {
			console.log('Status tweeted.');
		}
	});
});

/*
	this function filters outs stoping words and return the tokens without it.

	takes in a token
*/
function hasNoStopWords(token) {
	var stopwords = ['@', 'http', 'https', 'RT'];
	return stopwords.every(function(sw){
		return !token.includes(sw);
	});
}

/*
	this function cleans up the text and breaks it up intotokens.
*/
function cleanText(text) {
	return rita.RiTa.tokenize(text, ' ')
		.filter(hasNoStopWords)
		.join(' ')
		.trim();
}