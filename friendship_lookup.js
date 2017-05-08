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
	This script will show the relationship of a user to give a new field
	of the data coming back of connections of if the user is being 'following' 
	to you if you are following them and 'followed_by' to see if they are 
	following you.

	put the screen name of the person you want to follow in the section.
*/

bot.get('friendships/lookup', {screen_name: 'PUT THE SCREEN NAME YOU WANT TO SEE THE CONNECTION HERE'},
	function(err, data, response){
		if (err) {
			console.log(err);
		} else {
			console.log(data);	
		}
	}
);