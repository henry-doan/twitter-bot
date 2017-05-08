var Twit  = require('twit');
var Cred = require('./credentials.js');

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
})

// see followers
// can use followers/id or followers/list to get info
// put your screen name in the section
bot.get('followers/list', {screen_name: 'PUT YOUR SCREEN NAME HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
				data.users.forEach(function(user) {
					console.log(user.screen_name);	
				});
		}
	}
);