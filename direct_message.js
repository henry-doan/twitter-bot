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
	For Twitter a bot can only direct message a user if a user
	follow that bot, or else the bot will get banned.

	put the screen name of the person you want to DM in the section.

	Also put in the Text you want to message them.
*/

bot.post('direct_messages/new', {screen_name: 'PUT THE SCREEN NAME YOU WANT TO DM HERE', text: 'Hello World!'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
			console.log(data);	
			console.log(data.text + ' was direct messaged.');
		}
	}
);