var Twit  = require('twit');
var Cred = require('./credentials.js');

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
})

// post tweets
bot.post('statuses/update', {status: 'Hello World!'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
			console.log(data.text + ' was tweeted.');
		}
	}
);
