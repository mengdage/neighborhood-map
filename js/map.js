// Google Maps functionalities
var googleMap = googleMap || {};

(function(global){
  var document = global.document,
      window = global.window,
      mapService,
      map,        // The Google Map
      searchBox,  // The Google Place SearchBox
      markers = [],
      Marker,     // The Google Maps Marker
      marker;
  googleMap.onPlacesChanged = onPlacesChanged;
  googleMap.addMarker = addMarker;
  googleMap.removeMarker = removeMarker;

  function init() {
    mapService = global.mapService;
    map = mapService.map;
    searchBox = mapService.searchBox;
    Marker = mapService.Marker;
  }

  function onPlacesChanged(callback) {
    searchBox.addListener('places_changed', callback);
  }

  // add a new marker on the map
  // param data must have a latlng which is {lat: 123, lng: 456}
  function addMarker(data) {
    var marker = new Marker({
      position: data.latlng,
      map: map,
      animation: google.maps.Animation.DROP
    });
    marker.id = data.id;
    markers.push(marker);
  }

  // remove a marker with the markerId
  function removeMarker(markerId) {
    var marker = findMarker(markerId);
    if(marker) { // a valid marker is found
      marker.setMap(null);
      markers.splice(markers.indexOf(marker),1);
    } else { // cannot find a marker
      console.warn('Failed to remove the marker with id-' + markerId + ' because it cannot be found!');
    }

  }
  // find the marker with markerId in the array markers
  // return null if not find
  function findMarker(markerId) {
    var i;
    for(i=0, max = markers.length; i < max; i++) {
      if(markers[i].id == markerId) {
        return markers[i];
      }
    }
    // not find the marker with markerId
    return null;
  }

  window.addEventListener('load', init, false);
})(self);
