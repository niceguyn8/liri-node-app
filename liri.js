// require("dotenv").config();
var request = require('request');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var Twitter = require('twitter');
var fs = require('fs');

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

movieGetter = function(movieTitle) {

  request('http://www.omdbapi.com/?apikey=trilogy&t=' + "'" + movieTitle + "'" , function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    console.log('Title: ' + JSON.parse(body).Title);
    console.log('Year: ' + JSON.parse(body).Year);
    console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
    // Unable to retrieve rotten tomatoes rating (nested)
    var rottenTomatoes = JSON.parse(body).Ratings[1];
    console.log('Rotten Tomatoes Rating: ' + JSON.stringify(rottenTomatoes.Value));
    console.log('Country: ' + JSON.parse(body).Country);
    console.log('Language: ' + JSON.parse(body).Language);
    console.log('Plot: ' + JSON.parse(body).Plot);
    console.log('Actors: ' + JSON.parse(body).Actors);
  });
}

var doIt = function() {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Data from txt file: ' + data);

    var randomText = data.split(',');


    userInput(randomText[0], randomText[1]);
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
    case 'movie-this' :
        movieGetter(functionData);
      break;
    case 'do-what-it-says':
          doIt();
      break;
  default:
  console.log('Nope. No way. Not a command.');
  }
}

var liriSearch = function(firstInput, secondInput) {
  userInput(firstInput, secondInput);
};

liriSearch(process.argv[2], process.argv[3]);
