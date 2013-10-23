#JellyBoxes

A small jQuery extension that adds a function, .jellyBoxes([options]), to any positioned (non-static), square DOM element. JellyBoxes empties the element, then fills it with a number of randomly-colored squares that animate into random positions within a diamond on setup, and on every mouseover after that.

It's probably easier to just see it in action [here](http://www.robhdawson.com/jelly_boxes/). It's not exactly practical, but I'd like to think it's pretty neat-looking.

The options it takes is a plain JavaScript object, with the following properties:

- grid: the dimensions, in number of squares, of the grid. If this is set to an odd number, display will be a full square, rather than a diamond. (default: 24)
- easing: a string indicating which easing function to use. (default: "swing")
- duration: a string or number that determines the length of the animation. (default: 800)
- density: a number between 0 and 1, representing the percentage of available positions that will be filled by squares (default: 0.6)
- colors: an array of colors. (defaults below)

!["#27ae60", "#2ecc71", "#2980b9", "#3498db", "#e67e22", "#f1c40f", "#e74c3c", "#34495e"](https://raw.github.com/robhdawson/jelly_boxes/master/colors.png)

Demo uses easing functions from the [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/).