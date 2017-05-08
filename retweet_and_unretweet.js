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
	This function gets the time line of the top 5 post 
	in the timeline and prints out the tweet.
	users screen name and the id.

	Input the count of how many recent tweets you want to see.

	To call the function:
	getBotTimeline();
*/

function getBotTimeline() {
	bot.get('statuses/home_timeline', {count: '5'},
		function(err, data, response){
			if (err) {
				console.log(err);
			} else {
					data.forEach(function(d) {
						console.log(d.text);	
						console.log(d.user.screen_name);
						console.log(d.id_str);
						console.log('\n');
				});
			}
		}
	);
}

/* 
	This does the retweet to a id in the parameter.
	To get the id use the function above.

	Input the id that you want to retweet.
*/

bot.post('statuses/retweet/:id', {id: 'PUT THE USER ID HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				console.log(data.text + ' was retweeted.');	
		}
	}
);

/* 
	This does the unretweet to a id in the parameter.
	To get the id use the function above.

	Input the id that you want to unretweet.

	Comment this portion if you don't want to run the
	unretweet action.
*/

bot.post('statuses/unretweet/:id', {id: 'PUT THE USER ID HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				console.log(data.text + ' was unretweeted.');	
		}
	}
);