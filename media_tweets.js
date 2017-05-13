var Twit  = require('twit');
var request = require('request');
var fs = require('fs');
var Cred = require('./credentials.js');
var NasaKey = require('./nasa_credentials.js');

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
})

/* 
	The NASA api gives you access to photos and videos of the nasa
	This function in particular will return you the photo of the day
	and post it on your twitter account.

	Make sure to sign up and use the NASA API Here:
		https://api.nasa.gov/index.html#apply-for-an-api-key
	and fill out the nasa_credentials.js same as the example.
	
*/

function getPhoto(){
	var parameters = {
		url:'https://api.nasa.gov/planetary/apod',
		qs: {
			api_key: NasaKey.nasa_API_key
		},
		encoding: 'binary'
	};

	request.get(parameters, function(err, response, body) {
		body = JSON.parse(body);
		saveFile(body, 'nasa.jpg');
	});
}

	// Saves the photo in this directory
function saveFile(body, fileName) {
	var file = fs.createWriteStream(fileName);
	request(body).pipe(file).on('close', function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Media Saved.');
			// shows detais of the photo
			// console.log(body);
			var descriptionText = body.title;
			uploadMedia(descriptionText, fileName);
		}
	})
}

// uploads it to twitter
function uploadMedia(descriptionText, fileName) {
	var filePath = __dirname + '/' + fileName;
	bot.postMediaChunked({file_path: filePath},
		function(err, data, response) {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
				var params = {
					status: descriptionText,
					media_ids: data.media_id_string
				};
				postStatus(params);
			}
		});
}

// post it to twitter
function postStatus(params) {
	bot.post('statuses/update', params, function(err, data, response) {
		if (err) {
			console.log(err);
		} else {
			console.log('Status Posted!');
		}
	});
}

// Gives youthe Photo from the NASA API
getPhoto();

// Gives you the video from the NASA API
uploadMedia('Video from NASA', 'nasa_video.mp4')
