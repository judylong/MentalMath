MentalMath.Views.Login = Backbone.View.extend({
  initialize: function(options) {
    this.callback = options.callback;
    this.listenTo(MentalMath.currentUser, "logIn", this.loginCallback);
  },

  template: JST['users/login'],

  className: 'sign-log-div',

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  events: {
    "submit form":"submit",
    "click .guest":"loginGuest"
  },

  submit: function(e) {
    e.preventDefault();

    var $form = $(e.currentTarget);
    var loginData = $form.serializeJSON().user;

    MentalMath.currentUser.logIn({
      email: loginData.email,
      password: loginData.password,
      error: function() {
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  loginCallback: function() {
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("#playGame", {trigger: true});
    }
  },

  loginGuest: function(e) {
    e.preventDefault();
    MentalMath.currentUser.logIn({
      email: 'guestUser@example.com',
      password: 'password',
      error: function() {
        alert("Wrong username/password combination. Please try again.");
      }
    });
  }
});
