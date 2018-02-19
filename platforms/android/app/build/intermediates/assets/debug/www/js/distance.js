window.addEventListener('load', docLoaded);

// Global variables to get http requests
var origLat, origLong, destLat, destLong;

function getQuery() {
  var orig = document.getElementById("origin").value;
      orig = orig.split(' ').join('+');
  var dest = document.getElementById("destination").value;
      dest = dest.split(' ').join('+');

  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + orig + "&key=AIzaSyBt3uKBhBC3dEBbvgOGkXcKzB8fQilcJDA" ;
      httpGetAsync(requestUrl, setOrig);
      requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + dest + "&key=AIzaSyBt3uKBhBC3dEBbvgOGkXcKzB8fQilcJDA" ;
      httpGetAsync(requestUrl, setDest);
      requestUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + orig + "&destinations=" + dest +"&key=AIzaSyBt3uKBhBC3dEBbvgOGkXcKzB8fQilcJDA";
      httpGetAsync(requestUrl, setDist);
}

function setOrig(response) {
  document.getElementById('originFromattedAddress').innerHTML = response.results[0].formatted_address;
  origLong = response.results[0].geometry.location.lng;
  origLat = response.results[0].geometry.location.lat;
  document.getElementById('originLongField').innerHTML = origLong;
  document.getElementById('originLatField').innerHTML = origLat;
}

function setDest(response) {
  document.getElementById('destinationFromattedAddress').innerHTML = response.results[0].formatted_address;
  destLong = response.results[0].geometry.location.lng;
  destLat = response.results[0].geometry.location.lat;
  document.getElementById('destinationLongField').innerHTML = destLong;
  document.getElementById('destinationLatField').innerHTML = destLat;
}

function setDist(response) {
  document.getElementById('distanceField').innerHTML = response.rows[0].elements[0].distance.value;
  initMap();
  document.getElementById("resultsArea").style.display = "block";
}

function rad(x) {
  return x * Math.PI / 180;
};

function getDistance(p1, p2) {
  var R = 6378137;
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

function initMap() {
  var origCoords = { lat: origLat, lng: origLong };
  var destCoords = { lat: destLat, lng: destLong };

  var calculatedDistance = Math.floor(getDistance(origCoords, destCoords));

  calculatedDistance.toString();
  calculatedDistance += " meters";
  document.getElementById('displacementField').innerHTML = calculatedDistance;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: origCoords
  });
  var origMarker = new google.maps.Marker({
    position: origCoords,
    map: map
  });
  var destMarker = new google.maps.Marker({
    position: destCoords,
    map: map
  });
  var polylineCoords = [
    origCoords,
    destCoords,
  ];
  var flightPath = new google.maps.Polyline({
    path: polylineCoords,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map
  });
}

function docLoaded() {
  document.getElementById("submitQuery").addEventListener('click', getQuery);
}
