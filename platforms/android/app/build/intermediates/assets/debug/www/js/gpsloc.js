window.addEventListener('load', docLoaded);

function docLoaded() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

var options = {
  maximumAge: 3000,
  timeout: 30000,
  enableHighAccuracy: true
};

function onSuccess(position) {
  document.getElementById("longField").innerHTML = position.coords.longitude;
  document.getElementById("latField").innerHTML = position.coords.latitude;
  document.getElementById("resultsArea").style.display = "block";

  var coords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: coords
  });
  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });

  // To get the formatted address
  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    position.coords.latitude + ',' + position.coords.longitude +
                   "&key=AIzaSyBt3uKBhBC3dEBbvgOGkXcKzB8fQilcJDA" ;
  httpGetAsync(requestUrl, getAddress);
};

function getAddress(response) {
  document.getElementById("formattedAddressField").innerHTML = response.results[0].formatted_address;
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
