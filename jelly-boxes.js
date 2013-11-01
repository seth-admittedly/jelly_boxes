(function($) {
  function randEl(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function randElWithIndex(array) {
    var i = Math.floor(Math.random() * array.length);
    return [array[i], i]
  }

  $.fn.jellyBoxes = function(options) {
    var options = options;
    if(options && ["diamond","square"].indexOf(options.shape) === -1) {
      options.shape = "diamond";
    }

    var that = this;

    if(that.css("position") === "static") {
      return;
    }

    if(that.width() !== that.height()) {
      return;
    }

    that.empty();

    var settings = $.extend({
      colors: [
      "#27ae60", "#2ecc71",
      "#2980b9", "#3498db",
      "#e67e22", "#f1c40f",
      "#e74c3c", "#34495e"],
      grid: 24,
      easing: "swing",
      duration: 800,
      density: 0.6,
      borderRadius: "20%",
      shape: "diamond"
    }, options);

    var boxSize = settings.boxSize = Math.floor(that.width() / settings.grid);
    var size = boxSize * settings.grid;

    that.css({width: size, height: size})

    var positions = [];

    var lowMid = settings.grid/2 - 2;
    var highMid = settings.grid - (settings.grid/2 - 1)

    var unacceptableDiffs = [];
    var unacceptableSums = [];


    if(settings.shape === "diamond") {
      for(var i=highMid;i<settings.grid;i++) {
        unacceptableDiffs.push(i);
        unacceptableSums.push(i - 1 + settings.grid);
      }

      for(var i=lowMid;i>=0;i--) {
        unacceptableSums.push(i);
      }
    }

    for(var i=0;i<settings.grid;i++) {
      for(var j=0;j<settings.grid;j++) {
        if(
          unacceptableDiffs.indexOf(Math.abs(i - j)) === -1 &&
          unacceptableSums.indexOf(i + j) === -1
        ) {
          positions.push([i, j]);
        }
      }
    }

    var count = positions.length * settings.density;

    var middle = (size/2) - (boxSize/2)

    for(var i=0;i<count;i++) {
      var box = $('<div class="js-jellybox"></div>')
      box.css({
        position: "absolute",
        backgroundColor: randEl(settings.colors),
        top: 0,
        left: 0,
        height: boxSize,
        width: boxSize,
        borderRadius: settings.borderRadius
      });

      that.append(box);
    }

    var boxes = that.find(".js-jellybox");

    jellyOut(boxes, settings, positions, that);

    return that;
  }

  function jellyOut(boxes, settings, positions, $root) {
    $root.unbind();

    var untaken = jQuery.extend(true, [], positions);

    for(var i=0;i<boxes.length;i++) {
      var $box = $(boxes[i]);
      var randPositionArr = randElWithIndex(untaken);
      var position = randPositionArr[0];
      var index = randPositionArr[1];

      if(i === boxes.length - 1) {
        var callback = function() {
          $root.mouseover(function() {
            jellyOut(boxes, settings, positions, $root);
          });
        }
      } else {
        var callback = function() {};
      }

      // $box.animate({
      //   top: position[0] * settings.boxSize,
      //   left: position[1] * settings.boxSize
      // }, settings.duration, settings.easing, callback);
      $box.css({
        "-webkit-transition" : "-webkit-transform 0.5s ease",
        "transform" : "translate3d(" + position[1]*settings.boxSize + "px," + position[0]*settings.boxSize + "px,0px)"
      });
      callback();

      untaken.splice(index, 1);
    }
  }
})(jQuery);