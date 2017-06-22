// The marker model
(function(global) {
  'use strict';
  global.models = global.models || {};
  global.models.MarkerModel = MarkerModel;

  var window = global.window,
      ko;

  window.addEventListener('load', init());

  function init() {
    ko = global.ko;
  }

  function MarkerModel(data) {
    if(!(this instanceof MarkerModel)) {
      return new Marker();
    }

    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.latlng = ko.observable(data.latlng);

  }
})(self);
