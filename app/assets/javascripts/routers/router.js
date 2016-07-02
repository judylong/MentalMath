MentalMath.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "":"landing",
    "playGame": "playGame",
    "myStats": "myStats",
    "users/new": "newUser",
    "session/new": "logIn"
  },

  landing: function() {
    var view = new MentalMath.Views.Landing();
    this._swapView(view);
  },

  playGame: function() {
    var view = new MentalMath.Views.PlayGame();
    this._swapView(view);
  },

  myStats: function() {
    var view = new MentalMath.Views.MyStats();
    this._swapView(view);
  },

  newUser: function() {
    if (!this._requireLoggedOut()) {return;}
    var model = new MentalMath.Models.User();
    var view = new MentalMath.Views.UsersSignup({model: model});
    this._swapView(view);
  },

  logIn: function(callback) {
    if (!this._requireLoggedOut(callback)) {return;}
    var view = new MentalMath.Views.Login({callback: callback});
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  },

  _requireLoggedIn: function(callback) {
    if (!MentalMath.currentUser.isLoggedIn()) {
      callback = callback || this._goHome.bind(this);
      this.logIn(callback);
      return false;
    }
    return true;
  },

  _requireLoggedOut: function(callback) {
    if (MentalMath.currentUser.isLoggedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }
    return true;
  },

  _goHome: function() {
    Backbone.history.navigate("", {trigger: true});
  }
});
