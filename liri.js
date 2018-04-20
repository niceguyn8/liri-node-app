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
var spotify = new Spotify({
  id: 'da0813234f504ae385913eb5a6fb7886',
  secret: 'a98d203c6f254c8bbccbf45c2ae15b73',
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log(data);
});







var userInput = function(caseData, functionData) {
  switch(caseData) {
    case 'my-tweets' :
      twitterGetter();
      break;
  default:
  console.log('Nope. No way. Not a command.');
  }
}

var liriSearch = function(firstInput, secondInput) {
  userInput(firstInput, secondInput);
};

liriSearch(process.argv[2], process.argv[3]);
