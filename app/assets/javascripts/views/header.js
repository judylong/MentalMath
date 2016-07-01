MentalMath.Views.Header = Backbone.View.extend({
  initialize: function() {
    this.listenTo(MentalMath.currentUser, "logIn logOut", this.render);
    this.render();
  },

  events: {
    "click #log-out-link": "logOut"
  },

  template: JST['shared/header'],

  render: function() {
    this.$el.html(this.template({currentUser: MentalMath.currentUser}));
    return this;
  },

  logOut: function(e) {
    e.preventDefault();
    MentalMath.currentUser.logOut({
      success: function() {
        Backbone.history.navigate("session/new", {trigger: true});
      }
    });
  }
});
