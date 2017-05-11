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

