//Initialize required modules and files
require("dotenv").config();
var request = require('request')
var keys = require('./keys.js')
var Spotify = require('node-spotify-api')
var moment = require('moment')
var fs = require('fs')
var spotify = new Spotify(keys.spotify)

//Grab commandline arguments
var command = process.argv[2]
var arg = process.argv[3]


doThis(command,arg)


//wrap fs.appendFile in a shorter function
function append(data){
    fs.appendFile('log.txt',data,function(err){
        if(err){
            return console.log(err)
        }
    })
}

//Check for which function to call
function doThis(command,arg){
    append('-------------------------------------------------------------------\n'+command+'\n\n')
    if (command == 'spotify-this-song'){
        song(arg)
    }

    if (command == 'concert-this'){
        bands(arg)
    }
    
    if(command == 'movie-this'){
        movie(arg)
    }

    if(command == 'do-what-it-says'){
        doIt()
    }

}


function song(song){
    // Default to American Idiot
    if(!song){
        var song = 'American Idiot'
    }
    spotify.search({ type: 'track', query: song},function(err,response){
        //Append all info taken from the search to the variable info
        var info = ''
        if(err){
            info += err + '\n'
        }

        info += (response.tracks.items[0].name) + '\n'
        response.tracks.items[0].artists.forEach(function(artist){
            info += (artist.name) + '\n'
        })

        if(response.tracks.items[0].preview_url){
            info += (response.tracks.items[0].preview_url) + '\n'
        }
        else{
            info += ('No Preview Available') + '\n'
        }

        info += (response.tracks.items[0].album.name) + '\n'

        console.log(info)
        append(info)
    })
}

function bands(artist){
    if(!artist){
        console.log('Please enter an artist/band name')
        return
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    var info = ''
    request(queryURL, function(err,response,body){
        if (!err && response.statusCode === 200){
            var data = JSON.parse(body)
            data.forEach(function(event){
                info += event.venue.name + '\n'
                info += (event.venue.city+' '+event.venue.region+' '+event.venue.country) + '\n'
                info += (moment(event.datetime).format('MM/DD/YYYY')) + '\n'
                info += '\n'
            })
        }
        console.log(info)
        append(info)
    })
}

function movie(title){
    if(!title){
        title = 'Mr. Nobody'
    }
    var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t='+title
    var info = ''
    request(queryURL, function(err,response,body){
        if (!err && response.statusCode === 200){
            var data = JSON.parse(body)
            info += (data.Title) + '\n'
            info += (data.Year) + '\n'

            var noRating = true
             // if noRating is still true at the end of this add an appropriate string instead of the rating
            data.Ratings.forEach(function(rating){
                //Look in ratings and pull out only the rotten tomatoes and IMDB ratings
                if(rating.Source == 'Rotten Tomatoes' || rating.Source == 'Internet Movie Database'){
                    noRating = false
                    info += (rating.Source + ': ' + rating.Value) + '\n'
                } 
            })
            if (noRating){
                info += ('No ratings from IMDB or Rotten Tomatoes') + '\n'
            }

            info += (data.Country) + '\n'
            info += (data.Language) + '\n'
            info += (data.Plot) + '\n'
            info += (data.Actors) + '\n'
            
        }
        console.log(info)
        append(info)
    })
}

function doIt(){
    fs.readFile('random.txt', 'utf8', function(err,data){
        if(err){
            append(err)
            return console.log(err)
        }
    data = data.split(',')
    var command = data[0]
    var arg = data[1]
    //Call a different function in doThis based on the arguments grabbed from the text file
    doThis(command,arg)
    })
}