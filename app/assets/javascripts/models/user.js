MentalMath.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  toJSON: function() {
    var json = { user: _.clone(this.attributes) };
    return json;
  },

  parse: function(resp) {
    var chartUp = false;
    if (resp.levels) {
      this._levels = resp.levels;
      delete resp.levels;
      chartUp = true;
    }
    if (resp.correctCount) {
      this.set("correctCount", resp.correctCount);
      delete resp.correctCount;
      chartUp = true;
    }
    if (resp.wrongCount) {
      this.set("wrongCount", resp.wrongCount);
      delete resp.wrongCount;
      chartUp = true;
    }
    if (chartUp) {
      this.trigger("chartUp");
    }
    return resp;
  },

  levels: function() {
    return this._levels;
  }
});

MentalMath.Models.CurrentUser = MentalMath.Models.User.extend({
  url: "/api/session",

  initialize: function(options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isLoggedIn: function() {
    return !this.isNew();
  },

  logIn: function(options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data) {
        model.set(data);
        model.fetch();
      },
      error: function() {
        alert("Error! Could not log in.");
      }
    });
  },

  logOut: function(options) {
    var model = this;
    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data) {
        model.clear();
        Backbone.history.navigate("", {trigger: true});
      },
      error: function() {
        alert("Error! Could not log out.");
      }
    });
  },

  fireSessionEvent: function() {
    if (this.isLoggedIn()) {
      this.trigger("logIn");
    } else {
      this.trigger("logOut");
    }
  }
});
