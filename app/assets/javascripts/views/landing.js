MentalMath.Views.Landing = Backbone.View.extend({
  template: JST['landing/landing'],

  className: 'landing',
  
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
