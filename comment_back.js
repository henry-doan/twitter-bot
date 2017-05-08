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
	This comments to a particular tweet with the id.

	The params in the status is the targets person 
	screen name with a space with the message then the id
	of the tweet.

	To get the id use the function in the retweet_and_unretweet.js file.

	Input the id that you want to comment.
*/

bot.post('statuses/update', {status: '@TARGET_SCREEN_NAME  THEN PUT COMMENT HERE',
	in_reply_to_status_id: 'PUT TWEET ID HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				console.log(data);	
		}
	}
);

