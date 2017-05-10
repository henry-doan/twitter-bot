var Twit  = require('twit');
var Cred = require('./credentials.js');

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
})

/* 
	The Steam api gives you an access of real time tweets.

	There are two ways to do this, the first is the sample of public 
	tweets from the last 7 days.

	The code block below will give you a lot of data, so be sure to
	hit control c to stop the data flow.
	
*/

var stream = bot.stream('statuses/sample');

stream.on('tweet', function(tweet){
	console.log(tweet.text + '\n');
});

/* 
	The Steam api gives you an access of real time tweets.

	there are two ways to do this, the second way is the filter
	and it can have a specific result. You can also add params 
	to filter a certain way.

	Track param takes in a word to search for in the tweet.
	To search for words by using commas , to represents a or and
	gives you one word or the other in the tweet. and a space to represent 
	and, and it will give you tweets of both words. The rule with
	punctuation it will take the word with punctuation and returns both the
	word and punctuation with exact location.
		example:
			track: 'win'

		example2:
			track: 'win, lose'

		example3:
			track: 'win lose'

	
	The locations param and filter by location and takes in two
	coordinates which represents a bounding box. The first coordinates being
	the south west corner.
		example:
			locations: '-74,40,-73,41'

			This returns tweets around new york city.

	The follow param followed by the user id
	to get users tweets.
		example:
			follows: '123456789'
	
	Input the id that you want to follow.
*/

var stream = bot.stream('statuses/filter', {
	follow: 'PUT USER ID HERE'});

stream.on('tweet', function(tweet){
	console.log(tweet.text + '\n');
});

