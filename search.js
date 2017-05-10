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
	This utilizes the search API to search tweets.

	The Search api return relative and not completions.
	So it will show sampling of tweets in the last 7 days.
	Completness is the Stream API in the stream.js file.

	The params is the q for query which is what we want to 
	search.

	You can search for single or more Search keyword. If you
	want tweets with the exact phrase then use "PUT SEARCH 
	ITEM HERE" in the input field.
		example: 
			q: '"Moms Cooking"'

	You can also search one word or the other with the OR
	Keyword. 
		example: 
			q: 'red OR blue'

	The search function uses a dash - to exclude a word in the
	search. For multiply words just chain them after the other.
		example: 
			q: 'happy -birthday'

		example2: 
			q: 'happy -birthday -anniversary'

	This search not only looks for key words but emojis as well
		example:
			q: '😋'

	Also search for hashtags.
		example:
			q: '#trending'

	Look for tweets to a user
		example: 
			q: 'to:@screen_name'

	Look for tweets from a user
		example: 
			q: 'from:@screen_name'

	Filter search results. safe keyword is safe content. media
	keyword after the filter is video content. vine keyword to 
	search for vines. images keyword looks for images. links keyword
	with search for urls. To look at a specific url it will have
	instead of the filter keyword it will have url followed by a colon
	and a word you want to search in the url. You can search for questions
	with the ? keyword symbol. 
		example: 
			q: 'dance filter:safe'

		example2:
			q: 'dance url:reddit'

	filter to search for a date with the since keyword with the year day and month
		example:
			q: 'books since:2017-01-01'

	The next param is count to show how many search results.
	
	The next param to pass is result_type that takes in a
	value of recent, to get recent tweets, or popular, to get
	popular tweets

	The next param is a geocode that takes in a latitude and 
	a longitude with a radius in miles for a location
	base search
		example:
			geocode: '37.781157, -122.398720, 1mi'

	Another parameter to las is the keyword lang with the value
	of the abbreviated language for other tweets in another language
		example: 
			lang: 'es'

	To get the id use the function in the retweet_and_unretweet.js file.

	Input the id that you want to delete.
*/

bot.get('search/tweets', {q: 'PUT SEARCH HERE', count: 5,
result_type: 'recent'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				data.statuses.forEach(function(status) {
					console.log(status.text);
					console.log(status.user.screen_name);
					console.log('\n');
				})
		}
	}
);

