window.MentalMath = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new MentalMath.Routers.Router({$rootEl: $('#main')});
    Backbone.history.start();
  }
};

$(document).ready(function() {
  MentalMath.initialize();
});
