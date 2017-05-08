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
	This delete a particular tweet with the given id.

	The params is the id of the tweet.

	To get the id use the function in the retweet_and_unretweet.js file.

	Input the id that you want to delete.
*/

bot.post('statuses/destroy/:id', {id: 'PUT TWEET ID HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				console.log(data.text + ' was deleted.');	
		}
	}
);

