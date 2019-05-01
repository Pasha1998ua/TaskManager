function initMap() {
    var position = {lat: 50.4546600, lng: 30.5238000};
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15, 
            center: position,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        });
    var marker = new google.maps.Marker({position: position, map: map});
  }