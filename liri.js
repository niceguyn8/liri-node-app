// require("dotenv").config();

var keys = require('./keys.js');

var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

var params = {screen_name: 'Niceguyn8Nate'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for (var i = 0; i < tweets.length; i++) {
      console.log('Created on: ' + tweets[i].created_at);
      console.log(' ');
      console.log('Message: ' + tweets[i].text);
    }
  }
});
