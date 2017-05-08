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
	This likes a tweet witht the given id.

	To get the id use the function in the retweet_and_unretweet.js file.

	Input the id that you want to like.
*/

bot.post('favorites/create', {id: 'PUT THE USER ID HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				console.log(data.text + ' was liked.');	
		}
	}
);

/* 
	This likes a unlikes a tweet with the given id.

	To get the id use the function in the retweet_and_unretweet.js file.

	Input the id that you want to unlike.

	Comment this portion if you don't want to run the
	unlike action.
*/

bot.post('favorites/destroy', {id: 'PUT THE USER ID HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				console.log(data.text + ' was unliked.');	
		}
	}
);