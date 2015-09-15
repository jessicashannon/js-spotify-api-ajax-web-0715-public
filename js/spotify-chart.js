var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.tracks.slice(0,20);
}

function extractNumberOfStreams(tracks) {
  // debugger;
  var array = [];
  tracks.forEach(function(track){
    array.push(track['num_streams'])
  });
  return array;
}

function extractNames(tracks) {
  var array = [];
  // debugger;
  tracks.forEach(function(track){
    array.push(track['track_name'])
  });
  return array;
}

function chartData(labels, inputData) {
  dataSetProperties.data = inputData
  var object = {
    "labels": labels,
    "datasets": [dataSetProperties]
  }
return object;
}

function getSpotifyTracks(callback){
  $.ajax({
      url: url,
      // jsonp: callback,
      dataType: "jsonp",
      success: function(response){callback(response)
      }
    })
    };

function success(parsedJSON){
  var topTracks = extractTop20Tracks(parsedJSON);
  var nameLabels = extractNames(topTracks);
  var streamData = extractNumberOfStreams(topTracks);
  var data = chartData(nameLabels, streamData);
// debugger;
  var ctx = $("#spotify-chart").get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);
}
