MentalMath.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "":"landing",
  },

  landing: function() {
    var view = new MentalMath.Views.Landing();
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
})
