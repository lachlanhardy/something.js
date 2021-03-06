(function () {
  var paperWidth = window.document.width,
      paperHeight = window.document.height,
      r = Raphael(0, 0, paperWidth, paperHeight);

  r.customAttributes.name = function(name) {
    r.text(this.attr("cx"), this.attr("cy"), name);
  };

  something = {
    setup: function () {
      var base = something.utils.random(100);
      while (base--) {
          something.diagonal(base);
      }
      something.getData();
    },

    // SELECT * FROM html WHERE url="http://brooklynbeta.org/about" and xpath="//div[@id='people']/ul"
    query: "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fbrooklynbeta.org%2Fabout%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40id%3D'people'%5D%2Ful%22&format=json",

    getData: function () {
      $.ajax({
         url: something.query,
         dataType: 'jsonp',
         jsonp: 'callback',
         jsonpCallback: 'something.draw'
      });
    },

    draw: function(data){
      var people = $.merge(data.query.results.ul[0].li, data.query.results.ul[1].li);
      for (var i=0, ii = people.length; i < ii; i++) {
          something.circle(20, people[i]);
      };
    },

    circle: function (number, person) {
      var diameter = number * 2;

      var circle = r.circle(
                      diameter + something.utils.randomX(),
                      diameter + something.utils.randomY(),
                      number
                    ).attr({
                      fill: "hsb(" + Math.random() + "," + Math.random() + "," + Math.random() + ")",
                      stroke: "none",
                      href: person.h3.a.href,
                      name: person.h3.a.em,
                      opacity: Math.random()
                    });

      circle.hover(function () {
          this.animate({scale: [2, 2, this.cx, this.cy]}, 500, "elastic");
      }, function () {
          this.animate({scale: [1, 1, this.cx, this.cy]}, 500, "bounce");
      });
    },

    diagonal: function (number) {
      r.path("M0 " + (paperHeight  - number * 30) + " L" + (paperWidth - number * 30) + " 0").attr({
        stroke: "hsb(" + Math.random() + "," + Math.random() + "," + Math.random() + ")",
        "stroke-width": something.utils.random(10),
        opacity: Math.random()
      });
    }

  };

  something.utils = something.utils || {};
  something.utils = {
    random: function (multiplier) {
      return Math.floor(Math.random() * multiplier + 1);
    },

    randomX: function () {
      return paperWidth - something.utils.random(paperWidth);
    },

    randomY: function () {
      return paperHeight - something.utils.random(paperHeight);
    }
  };

  $(function () {something.setup();});
})();