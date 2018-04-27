require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);




// Define function to log out 20 tweets
function myTweets() {
    var params = { screen_name: 'joshmyager', count: 20 };
    client.get('statuses/user_timeline', params, function (err, tweets, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; 0 < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("---------------------");
        }
    });
}

// Define function to display spotify info
function spotifySong() {
    if (userQuery) {
        spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song title: " + data.tracks.items[0].name);
            console.log("Preview link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    }
    else {
        spotify.search({ type: 'track', query: "The Sign, Ace of Base", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song title: " + data.tracks.items[0].name);
            console.log("Preview link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    }
}

// Define movie search function
function movie() {
    if (userQuery) {
        var array = process.argv;
        var newArray = array.splice(3, array.length);
        var newString = newArray.toString();
        var plusQuery = newString.replace(/,/g, "+");
        var queryUrl = "http://www.omdbapi.com/?t=" + plusQuery + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rating);
                console.log("Production Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);

            }
        })
    }
    else {
        var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body))
            }
        })
    }
}

// Define do what it says function
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        command = dataArr[0];
        userQuery = dataArr[1];
        checkArgument();
    });
}

// Check users argument  
function checkArgument() {
    switch (command) {
        case 'my-tweets':
            myTweets();
            break;

        case 'spotify-this-song':
            spotifySong();
            break;

        case 'movie-this':
            movie();
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

// Take user argument
var command = process.argv[2];
var userQuery = process.argv[3];

// Run checkArgument function at start
checkArgument();
