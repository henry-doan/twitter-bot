var Twit  = require('twit');
var Cred = require('./credentials.js');
var tracery = require('tracery-grammar');

// be sure to npm install or yarn install tracery-grammer

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
});

// This makes the story 
var grammar = tracery.createGrammar({
  'character': ['panda', 'nobody','taylor','cam', 'hacker', 'the turkey dinner'],
  'place': ['zoo', 'store', 'park', 'bank', 'lake'],
  'object': ['paper', 'money', 'playing card', 'phone', 'brick', 'sugar'],
  'setPronouns': [
  	'[they:they][them:them][their:their][theirs:theirs]',
  	'[they:she][them:her][their:her][theirs:hers]',
  	'[they:he][them:him][their:his][theirs:his]',
  ],
  'setJob': [
  	'[job:panda][actions:eat bamboo, sleep in bed, sneeze very loudly]',
  	'[job:chef][actions:make fine dining, makes 12 inch pizza, cooks top ramen]',
  	'[job:athlete][actions:run 12 k marathon, tackles 500 lbs muscles, jumps off the top rope]'
  ],
  'story': ['#protagonist# the #job# went to the #place# ever day. Usually #they# #actions#. Then #they# picked up #their# #object#.'],
  'origin': ['#[#setPronouns#][#setJob#][protagonist:#character#]story#']
});

// add any additions to the story
grammar.addModifiers(tracery.basedEngModifiers);

var story = grammar.flatten('#origin#');
console.log(story);

// post on twitter
bot.post('statuses/update', {status: story}, function(err, data, response){
	if (err) {
		console.log(err);
	} else {
		console.log('Bot has tweeted' + story);
	}
})