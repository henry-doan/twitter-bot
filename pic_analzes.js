var Twit  = require('twit');
var request = require('request');
var fs = require('fs');
var Cred = require('./credentials.js');
var vision = require('@google-cloud/vision')({
	projectId: 'YOUR POFJECT NAME',
	keyFilename: './keyfile.json'
})

// be sure make an icon with the google vision api. https://cloud.google.com/vision/

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
});

// This downloads a photo
function downloadPhoto(url, replyToName, tweetId){
	var parameters = {
		url: url,
		encoding: 'binary'
	};
	request.get(parameters, function(err, response, body) {
		var filename = 'photo' + Date.now() + '.jpg';
		fs.writeFile(filename, body, 'binary', 
			function(err) {
				console.log('Downloaded photo.');
				analyzePhoto(filename, replyToName, tweetId);
			});
	});
}

// looks at the photo for emotions with the vision API
function analyzePhoto(filename, replyToName, tweetId){
	vision.detectFaces(filename, function(err, faces) {
		const allEmotions = [];
		faces.forEach( function(face) {
			extractFaceEmotions(face).forEach( function(emotion) {
				if (allEmotions.indexOf(emotion) === -1) {
					allEmotions.push(emotion);
				}
			});;
		});
		postStatus(allEmotions, replyToName, tweetId);
	});
}

// Categorize the emotions
function extractFaceEmotions(face){
	const emotions = ['joy', 'anger', 'sorrow', 'surprise'];
	return emotions.filter(function(emotion){
		return face[emotion];
	})
}

// Post the tweet
function postStatus(allEmotions, replyToName, tweetId) {
	const status = formatStatus(allEmotions, replyToName);
	bot.post('statuses/update', {status: status, in_reply_to_status_id: tweetId}, function( err, data, response) {
		if (err) {
			console.log(err);
		} else {
			console.log('Bot has tweeted ' + status);
		}
	})
}

// Transform the emotions into text for the tweet
function formatStatus(allEmotions, replyToName){
	const reformatEmotions = {
		joy: 'happy',
		anger: 'angry',
		surprise: 'surprised',
		sorrow: 'sad'
	};
	const status = '@' + replyToName + ' Looking ';
	if (allEmotions.length > 0){
		allEmotions.forEach( function(emotion, i) {
			if (i === 0) {
				status = status + reformatEmotions[emotion];
			} else {
				status = status + ' add ' + reformatEmotions[emotion];
			}
		});
		status = status + '!';
	} else {
		status = status + 'neutral!';
	}
	return status;
}

// tracks and looks for streams
var stream = bot.stream('statuses/filter', {track: 'USER SCREEN NAME'});

stream.on('connecting', function(response){
	console.log('connecting...');
});

stream.on('connected', function(response){
	console.log('connected!');
});

stream.on('error', function(err){
	console.log(err);
})

stream.on('tweet', function(tweet){
	if (tweet.entities.media){
		downloadPhoto(tweet.entities.media[0].media_url, tweet.user.screen_name, tweet.id_str);
	}
})