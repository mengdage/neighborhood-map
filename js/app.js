(function(global) {
  'use strict';
  global.window.addEventListener('load', init);
  function init() {
    var ko = global.ko,
        viewmodels = global.viewmodels,
        MarkerModel = global.models.MarkerModel,
        googleMap = global.googleMap;



    ko.applyBindings(new viewmodels.Main());
  }
})(self);
