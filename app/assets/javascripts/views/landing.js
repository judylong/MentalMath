MentalMath.Views.Landing = Backbone.View.extend({
  initialize: function() {
    this.operationSpeechMatch = {
      '+': 'plus',
      '-': 'minus',
      '*': 'times',
      '/': 'divided by'
    }
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

    var utterance = new SpeechSynthesisUtterance(exp.speech);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);

    var question = {'text': exp.text};
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
        $('.correct').show();
        setTimeout(this.renderCard.bind(this),1000);
      } else {
        $('.wrong').show();
        setTimeout(function() {$('.wrong').hide();}, 500);
      }
    }
  },

  makeExpression: function() {
    this.left = Math.floor(Math.random() * 100).toString();
    var text = this.left + this.expOptions.operation + 11;
    var speech = [this.left, this.operationSpeechMatch[this.expOptions.operation], 11].join(" ");
    return {text: text, speech: speech};
  },

  checkingSolution: function(submission) {
    matchUp = {
      '+': function (x,y) { return x + y; },
      '-': function (x,y) { return x - y; },
      '*': function (x,y) { return x * y; },
      '/': function (x,y) { return x / y; }
    };
    var result;
    (matchUp[this.expOptions.operation](this.left, this.right) === +submission) ? (result = true) : (result = false);
    return result;
  },
})
