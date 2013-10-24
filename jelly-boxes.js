(function($) {
  function randEl(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  $.fn.jellyBoxes = function(options) {
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
      borderRadius: "20%"
    }, options);

    var boxSize = settings.boxSize = Math.floor(that.width() / settings.grid);
    var size = boxSize * settings.grid;

    that.css({width: size, height: size})

    var positions = [];

    var lowMid = settings.grid/2 - 2;
    var highMid = settings.grid - (settings.grid/2 - 1)

    var unacceptableDiffs = [];
    var unacceptableSums = [];

    for(var i=highMid;i<settings.grid;i++) {
      unacceptableDiffs.push(i);
      unacceptableSums.push(i - 1 + settings.grid);
    }

    for(var i=lowMid;i>=0;i--) {
      unacceptableSums.push(i);
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
      var box = $('<div class="jellybox"></div>')
      box.css({
        position: "absolute",
        backgroundColor: randEl(settings.colors),
        top: middle,
        left: middle,
        height: boxSize,
        width: boxSize,
        borderRadius: settings.borderRadius
      });

      that.append(box);
    }

    var boxes = that.find(".jellybox");

    jellyOut(boxes, settings, positions, that);

    return that;
  }

  function jellyOut(boxes, settings, positions, $root) {
    $root.unbind();

    var taken = [];

    for(var i=0;i<boxes.length;i++) {
      var $box = $(boxes[i]);

      while(true){
        var position = randEl(positions);

        if (taken.indexOf(position.join(",")) === -1) {
          taken.push(position.join(","));

          if(i === boxes.length - 1) {
            var callback = function() {
              $root.mouseover(function() {
                jellyOut(boxes, settings, positions, $root);
              });
            }
          } else {
            var callback = function() {};
          }

          $box.animate({
            top: position[0] * settings.boxSize,
            left: position[1] * settings.boxSize
          }, settings.duration, settings.easing, callback);

          break;
        }
      }
    }
  }
})(jQuery);