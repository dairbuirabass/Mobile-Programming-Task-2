window.addEventListener('load', docLoaded);

// Global variables to get http requests
var directionsDisplay, directionsService;
var origLat, origLng;

function getQuery() {
  var orig = document.getElementById("origin").value;
      orig = orig.split(' ').join('+');
  var dest = document.getElementById("destination").value;
      dest = dest.split(' ').join('+');
  var mode = document.getElementById('travelModeSelect');
      mode = mode.options[mode.selectedIndex].value;
      document.getElementById('travelModeField').innerHTML = mode;
      mode = mode.toUpperCase();

  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + orig + "&key=AIzaSyBt3uKBhBC3dEBbvgOGkXcKzB8fQilcJDA" ;
      httpGetAsync(requestUrl, setOrig);
      requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + dest + "&key=AIzaSyBt3uKBhBC3dEBbvgOGkXcKzB8fQilcJDA" ;
      httpGetAsync(requestUrl, setDest);

      calculateAndRenderDirections(orig, dest, mode);
}

function setOrig(response) {
  document.getElementById('orig').innerHTML = response.results[0].formatted_address;
  origLat = response.results[0].geometry.location.lat;
  origLng = response.results[0].geometry.location.lng;
}

function setDest(response) {
  document.getElementById('dest').innerHTML = response.results[0].formatted_address;
}

function calculateAndRenderDirections(origin, destination, mode) {
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4
  });
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));

  var request = { origin: origin,
                  destination: destination,
                  travelMode: mode
                }
  directionsService.route(request, function (result, status) {
    document.getElementById('right-panel').innerHTML = "";
    document.getElementById('resultsArea').style.display = "block";
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    else {
      document.getElementById('travelModeField').innerHTML = "This route does not exist.";
      map.setCenter({lat: origLat, lng: origLng});
    }
  })
}

function docLoaded() {
  document.getElementById("submitQuery").addEventListener('click', getQuery);
}
