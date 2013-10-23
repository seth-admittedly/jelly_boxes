#JellyBoxes

A small jQuery extension that adds a function, .jellyBoxes([options]), to any positioned (non-static) DOM element.

The "options" is a plain JavaScript object, with the following properties:

- grid: the dimensions, in number of squares, of the grid. (default: 24)
- easing: a string indicating which easing function to use. (default: "swing")
- duration: a string or number that determines the length of the animation. (default: 400)
- colors: an array of colors. (defaults below)
!["#27ae60", "#2ecc71", "#2980b9", "#3498db", "#e67e22", "#f1c40f", "#e74c3c", "#34495e"][colors]

See it in action [here](http://www.robhdawson.com/jelly_boxes/). Demo uses the [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/)'s "easeOutElastic" function.