MentalMath.Views.UsersSignup = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['users/signup'],

  className: 'sign-log-div',

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },

  events: {
    "submit form": "submit"
  },

  submit: function(e) {
    e.preventDefault();
    var $form = $(e.currentTarget);
    var userData = $form.serializeJSON().user;

    this.model.save(userData, {
      success: function() {
        MentalMath.currentUser.fetch();
        Backbone.history.navigate("", {trigger: true});
      },
      error: function(model, resp, data) {
        alert(resp.responseJSON.join('\n'));
      }
    });
  }
});
