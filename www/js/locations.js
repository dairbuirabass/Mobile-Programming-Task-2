var map;
var marker;
var infowindow;
var messagewindow;

function initMap() {
  var oulu = {lat: 65.0121, lng: 25.4651};
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: oulu
  });

  infowindow = new google.maps.InfoWindow({
      content: document.getElementById('form')
  });

  messagewindow = new google.maps.InfoWindow({
      content: document.getElementById('message')
  });

  google.maps.event.addListener(map, 'click', function(event) {
      marker = new google.maps.Marker({
          position: event.latLng,
          map: map
      });

      google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
          });
      });
}

function saveData() {
  var info = escape(document.getElementById('info').value);
  var latlng = marker.getPosition();
  var url = 'http://www.students.oamk.fi/~t6bada00/googlesymfony/phpsqlinfo_addrow.php?info=' + info +
            '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

  downloadUrl(url, function(data, responseCode) {

    if (responseCode != 404 || responseCode !=500 ) {
      infowindow.close();
      messagewindow.open(map, marker);
    } else {
      console.log("DAANG")
    }
  });
}

function downloadUrl(url, callback) {
  var request = new XMLHttpRequest();
  if ("withCredentials" in request) {
    request.open('GET', url, true);
  } else if (typeof XDomainRequest != "undefined") {
    request = new XDomainRequest();
    request.open('GET', url);
  }

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };
  request.send(null);
  }

function doNothing () {
}
