MentalMath.Views.Header = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  template: JST['shared/header'],
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
