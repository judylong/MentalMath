MentalMath.Views.MyStats = Backbone.View.extend({
  initialize: function() {
    this.listenTo(MentalMath.currentUser, "chartUp", this.renderCharts);

    MentalMath.currentUser.fetch();
    this.zeroedLevels = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0};
    this.render();
  },

  template: JST['myStats'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderCharts: function() {
    for(var i = 0; i<=8; i++){
      if (MentalMath.currentUser.levels()['level'+i].correct.length !== 0 ||
            MentalMath.currentUser.levels()['level'+i].wrong.length !== 0) {
        this.renderChart(i);
      }
    }
    this.renderSpider();
  },

  renderChart: function(level) {
    $('#level-chart'+level).highcharts({
        plotOptions: {
          series: {
            pointStart: 1
          }
        },
        title: {
            text: 'Response Times - Level ' + level,
            x: -20 //center
        },
        xAxis: {
            title: {
              text: 'Correct/Incorrect Question #'
            },
            allowDecimals: false
        },
        yAxis: {
            title: {
                text: 'Time to Answer (sec)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'sec',
            valueDecimals: 2,
            headerFormat: ""
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Correct',
            data: MentalMath.currentUser.levels()['level'+level].correct.map(function(el){return el/1000;})
        }, {
            name: 'Incorrect',
            data: MentalMath.currentUser.levels()['level'+level].wrong.map(function(el){return el/1000;})
        }]
    });
  },

  renderSpider: function() {
    $('#spider-chart').highcharts({

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Level Stats',
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
            headerFormat: '<span style="font-size: 15px">Level {point.key}</span><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{
            name: 'Total # Correct',
            data: _.values($.extend(this.zeroedLevels, MentalMath.currentUser.get('correctCount'))),
            pointPlacement: 'on'
        }, {
            name: 'Total # Incorrect',
            data: _.values($.extend(this.zeroedLevels, MentalMath.currentUser.get('wrongCount'))),
            pointPlacement: 'on'
        }]

    });
  }
});
