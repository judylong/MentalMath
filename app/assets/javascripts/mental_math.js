window.MentalMath = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.header = new MentalMath.Views.Header({el: $('#header')});
    this.router = new MentalMath.Routers.Router({$rootEl: $('#main')});
    Backbone.history.start();
  }
};

$(document).ready(function() {
  MentalMath.initialize();
});
