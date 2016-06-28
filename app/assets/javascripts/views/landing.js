MentalMath.Views.Landing = Backbone.View.extend({
  initialize: function() {
    this.operationSpeechMatch = {
      '+': 'plus',
      '-': 'minus',
      '*': 'times',
      '/': 'divided by'
    };
    this.expOptions = "";
    this.right = 11;
    this.showText = false;
  },

  template: JST['landing/landing'],

  className: 'landing',

  render: function() {
    this.expOptions = {'operation':'*'};

    var content = this.template();
    this.$el.html(content);

    setTimeout(function() {
      this.levelDiv = $('div').find('[data-level=0]');
      this.level = this.levelDiv.data('level');
      this.levelDiv.addClass('active');
      this.renderCard();
    }.bind(this));
    return this;
  },

  renderCard: function() {
    if (!this.currentExp) {
      this.currentExp = this.makeExpression();
    }

    this.speak(this.currentExp.speech);

    var question;// = {'text': this.currentExp.text};
    if (this.showText) {
      question = {'text': this.currentExp.text};
    } else {
      question = "";
    }
    $('.card').html(JST['landing/card']({question: question}));
    $('input').focus();
    return this;
  },

  speak: function(speech) {
    var utterance = new SpeechSynthesisUtterance(speech);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  },

  events: {
    "keyup .answer": "submitAnswer",
    "click .showText": "setShowText",
    "click input": "clearInput",
    "click .levels > div": "selectLevel"
  },

  selectLevel: function(e) {
    debugger
    this.levelDiv.removeClass('active');
    this.levelDiv = $(e.currentTarget);
    this.level = this.levelDiv.data('level');
    this.levelDiv.addClass('active');
  },

  clearInput: function(e) {
    e.target.value = "";
  },

  setShowText: function(e) {
    if (e.currentTarget.checked) {
      this.showText = true;
    } else {
      this.showText = false;
    }
    this.renderCard();
  },

  submitAnswer: function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (this.checkingSolution(e.target.value)) {
        $('.correct').show();
        this.currentExp = this.makeExpression();
        setTimeout(this.renderCard.bind(this),1000);
      } else {
        $('.wrong').show();
        setTimeout(function() {$('.wrong').hide();}, 500);
        this.speak(this.currentExp.speech);
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
