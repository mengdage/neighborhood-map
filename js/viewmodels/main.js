(function(global) {
  'use strict';
  global.viewmodels = global.viewmodels || {};
  global.viewmodels.Main = Main;


  function Main() {
    var ko = global.ko,
        googleMap = global.googleMap,
        self = this,
        MarkerModel = global.models.MarkerModel,
        defaults = {
          // Five locations in New York
          markers: [
            // Times Square.
            {
              name: 'Times Square',
              id: 'ChIJmQJIxlVYwokRLgeuocVOGVU',  // A Google Places ID.
              latlng: {
                lat: 40.758895,
                lng: -73.98513100000002
              }
            },
            // NY Public Library.
            {
              name: 'New York Public Library - Stephen A. Schwarzman Building',
              id: 'ChIJqaiomQBZwokRTHOaUG7fUTs',  // A Google Places ID.
              latlng: {
                lat: 40.75318230000001,
                lng: -73.98225339999999
              }
            },
            {
              name: 'The Metropolitan Museum of Art',
              id: 'ChIJb8Jg9pZYwokR-qHGtvSkLzs',  // A Google Places ID.
              latlng: {
                lat: 40.7794366,
                lng: -73.96324400000003
              }
            },
            // MoMA
            {
              name: 'The Museum of Modern Art',
              id: 'ChIJKxDbe_lYwokRVf__s8CPn-o',  // A Google Places ID.
              latlng: {
                lat: 40.7614327,
                lng: -73.97762160000002
              }
            },
            // Museum of Natural History
            {
              name: 'American Museum of Natural History',
              id: 'ChIJCXoPsPRYwokRsV1MYnKBfaI',  // A Google Places ID.
              latlng: {
                lat: 40.78132409999999,
                lng: -73.97398820000001
              }
            }
          ]
        };
    // collections of markers
    self.markers = ko.observableArray();

    self.addMarker = function(markermodel) {
      self.markers.push(markermodel);
    };

    self.removeMarker = function() {
      self.markers.remove(this);
      googleMap.removeMarker(this.id());
    };

    // add event listener to user's input
    googleMap.onPlacesChanged(function() {
      var places = this.getPlaces();
      if(places.length === 0) {
        return;
      }

      places.forEach(function(place){
        var data = {
          id: place.place_id,
          name: place.name,
          latlng: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
        };

        // make new MarkerModel and add it to the viewmodels
        var newMarker = new MarkerModel(data);
        self.addMarker(newMarker);

        // add new marker to the map
        googleMap.addMarker(data);

      });
    });

    init();

    function init() {
      var defaultMarkers = defaults.markers;
      defaultMarkers.forEach(function(markerData) {
        self.addMarker(new MarkerModel(markerData));
        googleMap.addMarker(markerData);
      });
    }
  }
})(self);
