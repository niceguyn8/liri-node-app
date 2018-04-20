// require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var Twitter = require('twitter');

// Twitter Node Package and fucntion to call
var twitterGetter = function () {

  var client = new Twitter(keys.twitter);

  var params = {screen_name: 'Niceguyn8Nate', count:20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log('--------------------------------------------------');
        console.log('Created on: ' + tweets[i].created_at);
        console.log('__________________________________________________ ');
        console.log('Message: ' + tweets[i].text);
      }
    }
  });
}


// Spotify Node Package
var spotifyGetter = function (songTitle) {

  var spotify = new Spotify({
    id: 'da0813234f504ae385913eb5a6fb7886',
    secret: 'a98d203c6f254c8bbccbf45c2ae15b73',
  });

  spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var song = data.tracks.items;

    for (var i = 0; i < song.length; i++) {
      // console.log(i);
      console.log('Artist(s): ' + song[i].artists[0].name);
      console.log('Song Title: ' + song[i].name);
      console.log('Album: ' + song[i].album.name);
      console.log('Preview Link: ' + song[i].preview_url);
      console.log('_______________________________________');
    }

  });
}







var userInput = function(caseData, functionData) {
  switch(caseData) {
    case 'my-tweets' :
      twitterGetter();
      break;
    case 'spotify-this-song':
        spotifyGetter(functionData);
      break;
  default:
  console.log('Nope. No way. Not a command.');
  }
}

var liriSearch = function(firstInput, secondInput) {
  userInput(firstInput, secondInput);
};

liriSearch(process.argv[2], process.argv[3]);
