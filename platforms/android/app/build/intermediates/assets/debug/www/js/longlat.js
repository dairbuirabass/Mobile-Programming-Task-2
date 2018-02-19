window.addEventListener('load', docLoaded);

function getQuery() {
  var address = document.getElementById("address").value;
      address = address.split(' ').join('+');
  var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBt3uKBhBC3dEBbvgOGkXcKzB8fQilcJDA" ;
      httpGetAsync(requestUrl, printLongLat);
}

function printLongLat(response) {
  document.getElementById("formattedAddressField").innerHTML = response.results[0].formatted_address;
  document.getElementById("longField").innerHTML = response.results[0].geometry.location.lng;
  document.getElementById("latField").innerHTML = response.results[0].geometry.location.lat;
  document.getElementById("resultsArea").style.display = "block";

  initMap();
}

function initMap() {
  var longField = Number(document.getElementById('longField').textContent);
  var latField  = Number(document.getElementById('latField').textContent);
  var coords = { lat: latField, lng: longField };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: coords
  });
  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });
}

function docLoaded() {
  document.getElementById("submitQuery").addEventListener('click', getQuery);
}
