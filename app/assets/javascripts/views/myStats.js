MentalMath.Views.MyStats = Backbone.View.extend({
  template: JST['myStats'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
