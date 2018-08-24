require("dotenv").config();
var keys = require('keys.js')
var spotify = new Spotify(keys.spotify)

var command = process.argv[3]

if (command == 'concert-this'){
    var artist = process.argv[4]
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    
}