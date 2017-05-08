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
	For Twitter a bot can only follow a user if a user
	follow that bot, or else the bot will get banned.

	put the screen name of the person you want to follow in the section.
*/

bot.post('friendships/create', {screen_name: 'PUT THE SCREEN NAME YOU WANT TO FOLLOW HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
			console.log(data);	
		}
	}
);