MentalMath.Views.PlayGame = Backbone.View.extend({
  initialize: function() {
    this.listenTo(MentalMath.currentUser, "logIn logOut", this.updatePlayer);
    this.updatePlayer();
    this.operationSpeechMatch = {
      '+': 'plus',
      '-': 'minus',
      '*': 'times',
      '/': 'divided by'
    };
    this.showText = false;
    this.score = 0;
  },

  template: JST['playGame/playGame'],

  className: 'play-game',

  render: function() {
    var content = this.template();
    this.$el.html(content);

    setTimeout(function() {
      this.levelDivs = $('div').find('[data-level=0]');
      this.level = this.levelDivs.data('level');
      this.levelDivs.addClass('active');
      this.renderCard();
      this.updateScore(0);
    }.bind(this));
    return this;
  },

  renderCard: function() {
    if (!this.currentExp) {
      this.currentExp = this.makeExpression();
    }

    this.speak(this.currentExp.speech);

    var question;
    if (this.showText) {
      question = {'text': this.currentExp.text};
    } else {
      question = "";
    }
    $('.card').html(JST['playGame/card']({question: question}));
    $('input').focus();
    return this;
  },

  speak: function(speech) {
    var utterance = new SpeechSynthesisUtterance(speech);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
    this.startTime = performance.now();
  },

  events: {
    "keyup .answer": "submitAnswer",
    "click .showText": "setShowText",
    "click input": "clearInput",
    "click .levels > div": "selectLevel"
  },

  selectLevel: function(e) {
    this.levelDivs.removeClass('active');
    this.level = $(e.currentTarget).data('level');
    this.levelDivs = $('div').find('[data-level='+ this.level +']');
    this.levelDivs.addClass('active');
    this.currentExp = this.makeExpression();
    this.renderCard();
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

  updatePlayer: function() {
    if (MentalMath.currentUser.isLoggedIn()) {
      this.playerIn = true;
    } else {
      this.playerIn = false;
    }
  },

  submitAnswer: function(e) {
    e.preventDefault();
    this.timeToAnswer = performance.now() - this.startTime;
    if (e.keyCode === 13) {
      if (this.checkingSolution(e.target.value)) {
        $('.correct').show();
        this.updateScore(1);
        this.currentExp = this.makeExpression();
        setTimeout(this.renderCard.bind(this),500);
      } else {
        $('.wrong').show();
        this.updateScore(-1);
        setTimeout(function() {$('.wrong').hide();}, 500);
        this.speak(this.currentExp.speech);
      }
    }
  },

  updateScore: function(increment) {
    this.score += increment;
    if (this.playerIn && increment !== 0) {
      $.ajax({
        url: "/api/recordings",
        data: {recording: {
          level: this.level,
          correct: increment > 0 ? true:false,
          duration_ms: this.timeToAnswer
        }},
        type: 'POST',
        dataType: 'json'
      });
    }
    $(".score").html(this.score);
  },

  makeExpression: function() {
    if (this.level === 0) {
      this.right = 11;
      this.left = this.numberGenerator(2);
      this.operation = '*';
    } else if (this.level === 1) {
      this.expressionSetter(2,2,'+');
    } else if (this.level === 2) {
      this.expressionSetter(3,3,'+');
    } else if (this.level === 3) {
      this.expressionSetter(2,2,'-');
    } else if (this.level === 4) {
      this.expressionSetter(3,3,'-');
    } else if (this.level === 5) {
      this.expressionSetter(2,1,'*');
    } else if (this.level === 6) {
      this.expressionSetter(3,1,'*');
    } else if (this.level === 7) {
      this.left = this.numberGenerator(2);
      this.right = this.left;
      this.operation = '*';
    } else if (this.level === 8) {
      this.expressionSetter(2,2,'*');
    } else if (this.level === 9) {
      this.left = this.numberGenerator(3);
      this.right = this.left;
      this.operation = '*';
    }
    var text = this.left + this.operation + this.right;
    var speech = [this.left, this.operationSpeechMatch[this.operation], this.right].join(" ");
    return {text: text, speech: speech};
  },

  numberGenerator: function(digits, looseRange) {
    digits -= 1;
    if (looseRange) {
      return Math.floor(Math.random() * Math.pow(10, digits)).toString();
    }
    return Math.floor(Math.random() * 9 * Math.pow(10, digits) + Math.pow(10, digits)).toString();
  },

  expressionSetter: function(digLeft, digRight, operation) {
    this.left = this.numberGenerator(digLeft);
    this.right = this.numberGenerator(digRight);
    this.operation = operation;
  },

  checkingSolution: function(submission) {
    matchUp = {
      '+': function (x,y) { return x + y; },
      '-': function (x,y) { return x - y; },
      '*': function (x,y) { return x * y; },
      '/': function (x,y) { return x / y; }
    };
    var result;
    (matchUp[this.operation](+this.left, +this.right) === +submission) ? (result = true) : (result = false);
    return result;
  },
});
