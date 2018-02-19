function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var response = JSON.parse(xmlHttp.responseText);
              callback(response);
        }
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
}
