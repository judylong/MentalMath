MentalMath.Views.Landing = Backbone.View.extend({
  initialize: function() {
    this.expOptions = "";
    this.right = 11;
  },

  template: JST['landing/landing'],

  className: 'landing',

  render: function() {
    this.expOptions = {'operation':'*'};
    var question = {'text': this.makeExpression()};

    var content = this.template({question: question});
    this.$el.html(content);
    return this;
  },

  events: {
    "keyup .answer": "submitAnswer"
  },

  submitAnswer: function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      alert(this.checkingSolution(e.target.value));
      this.render();
    }
  },

  makeExpression: function() {
    this.left = Math.floor(Math.random() * 100).toString();
    var text = this.left + this.expOptions.operation + 11;
    return text;
  },

  checkingSolution: function(submission) {
    matchUp = {
      '+': function (x,y) { return x + y; },
      '-': function (x,y) { return x - y; },
      '*': function (x,y) { return x * y; },
      '/': function (x,y) { return x / y; }
    };
    var result;
    debugger
    (matchUp[this.expOptions.operation](this.left, this.right) === +submission) ? (result = true) : (result = false);
    // this.currentExpression = this.makeExpression();
    return result;
  },
})
