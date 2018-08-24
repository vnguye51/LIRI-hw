# LIRI-hw
command line node app that takes in parameters and gives back data

LIRI takes in the command-line arguments:
* concert-this <artist>
  * Returns upcoming artist concerts from "Bands in Town" API
* spotify-this-song
  * Returns spotify info from the Spotify API
* movie-this <movie title>
  * Returns the info for the movie from the OMDB API
* do-what-it-says
  * Reads random.txt and performs one of the other commands based on the arguments inside the file
  
* All values are saved to a log.txt file

## 
Required packages are:
* Node-Spotify-API
* Request
* Moment
* DotEnv

A package.json is included to easily install packages.
 
