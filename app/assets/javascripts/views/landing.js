MentalMath.Views.Landing = Backbone.View.extend({
  initialize: function() {
    this.expOptions = "";
    this.right = 11;
  },

  template: JST['landing/landing'],

  className: 'landing',

  render: function() {
    this.expOptions = {'operation':'*'};

    var content = this.template();
    this.$el.html(content);

    setTimeout(this.renderCard.bind(this));
    return this;
  },

  renderCard: function() {
    var exp = this.makeExpression();
    var question = {'text': exp};
    $('.card').html(JST['landing/card']({question: question}));
    return this;
  },

  events: {
    "keyup .answer": "submitAnswer"
  },

  submitAnswer: function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (this.checkingSolution(e.target.value)) {
        debugger
        $('.correct').show();
        setTimeout(this.renderCard.bind(this),1000);
      } else {
        $('.wrong').show();
      }
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
    (matchUp[this.expOptions.operation](this.left, this.right) === +submission) ? (this.result = true) : (this.result = false);
    return this;
  },
})
