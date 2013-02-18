# Overview

This was an attempt at a [js1k](http://js1k.com/) entry. At 1,538 bytes I didn't quite make it to 1,024 bytes so I didn't bother entering. Learned a few tricks though.

The entry was intended to be the game of solitaire. You play by clicking a card to have the computer "play" the card. Clicking was the shortest user interaction to implement. 

# How To Play

The game is completely playable, just click any face-up card to have it played in either the Ace-spots or another game stack. Click the deck to reveal the top three cards from the deck. Refresh the page to re-deal the game.

# Building

The make files require the [Closure Compiler](https://developers.google.com/closure/compiler/) .jar file be located in the project directory.

# Tricks

Some of these tricks are quite obvious (I've been using a few of them for quite some time), but when faced with shrinking your code to unprecedented levels I managed to hack-n-find some other shortcuts.

- `15.67>>0` will truncate the decimal
- `~i` will test for indicies `+n` to `0`, anything below `0` will be falsey
- `%` use the modulo operator to shorten arithmetic calculations
- `#f00` use shorthand hexidecimals
- `red` use colour name if it's shorter than shorthand hexidecimal
- `function(f) { setTimeout(f, 16.66); }` use this for requestAnimationFrame (inline it if only using once)
- `a.splice(-3)` splice the last 3 elements from an array (always returns an array)
- `a.slice(-3)` slice the last 3 elements from an array (always returns an array)
- `c.width = c.width` clear the canvas