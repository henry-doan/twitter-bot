var Twit  = require('twit');
var Cred = require('./credentials.js');
var rita = require('rita');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var ffmpegPath = require('@ffmpeg-installer/ffmpeg');
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath.path);

// be sure to npm install or yarn install all the above

var bot = new Twit ({
	consumer_key: `${Cred.consumer_key}`,
	consumer_secret: `${Cred.consumer_secret}`,
	access_token: `${Cred.access_token}`,
	access_token_secret: `${Cred.access_token_secret}`,
	timeout_ms: 60*1000
});

// auto bot 

var bot_username = '@YOUR SCREEN NAME'

// makes the video
var imgFileName = path.join(process.cwd(), 'black.jpg');
var midiFileName = path.join(process.cwd(), 'output.mid');
var waveFileName = path.join(process.cwd(), 'output.wav');
var videoFileName = path.join(process.cwd(), 'output.mp4');

/*
  this function filters outs stoping words and return the tokens without it.

  takes in a token
*/
function hasNoStopWords(token) {
  var stopwords = ['@', 'http', 'https', 'RT'];
  return stopwords.every(function(sw){
    return !token.includes(sw);
  });
}

/*
  this function checks and returns no punctuation.

  takes in a token
*/
function isNotPunctuation(token) {
  return !rita.RiTa.isPunctuation(token);
}

/*
  this function make sure the input is readable for execution.

  takes in a token
*/
function cleanText(text) {
  return text.split(' ')
          .filter(hasNoStopwords)
          .join(' ')
          .trim();
}

// returns nouns verbs etc.
function getPartsOfSpeech(text) {
  return rita.RiTa.getPosTags(text);
}

/*
  this function adds the notes.

  takes in a tagged tweet and a track
*/
function compose(taggedTweet, track) {
  var notes = tagged.Tweet.map(function(tag) {
    if (tag.includes('nn') || tag.includes('i')) {
      return 'e4';
    }
    if (tag.includes('vb')){
      return 'g4';
    }
    return 'c4';
  });
  notes.forEach(function(note){
    track.addNote(0, note, 128);
  });
  return track;
}

/*
  this function makes the videos by caling other methods
*/
function createMidi(tweet, midiFileName, callback) {
  var file = new midi.File();
  var track = new midi.Track();
  file.addTrack(track);
  var cleanedText = rita.Rita
  .tokenize(cleanText(tweet.text)
  .filter(isNotPunctuation)
  .join(' ');

  var taggedTweet = getPartsOfSpeech(cleanedText);
  compose(taggedTweet, track);

  fs.writeFile(midiFileName, file.toBytes(), {encoding: 'binary'}, callback);
}

/*
  this function converts a midi file to a wave file
*/
function convertMidiToWav(midiFileName, waveFileName, callback){
  var command = 'timidity --output-24bit -A120 ' + 
      midiFileName + ' -Ow -o ' + waveFileName;
  child_process.exec(command, {}, function(err, stdout, stderr){
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

/*
  this function makes the media with the options
*/
function createVideo(midiFileName, waveFileName, videoFileName, callback){
  ffmpeg()
    .on('end', function() {
      callback(null);
    })
    .on('error', function(err, stdout, stderr){
      callback(err);
    })
    .input(imgFileName)
    .inputFPS(1/6)
    .input(waveFileName)
    .output(videoFileName)
    .outputFPS(30)
    .run();
}

function createMedia(tweet, imgFileName, midiFileName, waveFileName, videoFileName, callback) {
  createMidi(tweet, midiFileName, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      convertMidiToWav(midiFileName, waveFileName, 
        function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('Midi converted!');
            createVideo(midiFileName, waveFileName, videoFileName, callback);
          }
      });
    }
  });
}

/*
  this function delete the wav file when it is done
*/
function deleteWav(waveFileName, callback) {
  var command = "rm " + waveFileName;
  child_process.exec(command, {}, 
    function(err, stdout, stderr){
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
}

/*
  this function consoles the bot has posted
*/
function postStatus(params) {
  bot.post('statuses/update', params, 
    function(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        console.log('Bot has posted!');
      }
    });
}

/*
  this function uploades it on twitter
*/
function uploadMedia(tweet, videoFileName){
  bot.postMediaChunked({file_path: videoFileName}, 
    function(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        var stat = tweet.text.split(bot_username)
          .join(' ')
          .trim();
        var params = {
          status: '@' + tweet.user.screen_name + ' ' + stat,
          in_reply_to_status_id: tweet.id_str,
          media_ids: data.media_id_string
        } 
        postStatus(params);
      }
    })
}

/*
  Set Streams
*/
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
  if (tweet.text.length){
    createMedia(tweet, imgFileName, midiFileName, waveFileName, videoFileName, 
      function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('Media created!');
          deleteWav(waveFile, function(err){
            if (err) {
              console.log(err)
            } else {
              uploadMedia(tweet, videoFileName);
            }
          });
        }
      });
  }
})