// Tricks:
// 15.67>>0 = will truncate the decimal
// ~i = will test for indicies positive n to 0, anything below 0 will be falsey
// % = use the modulo operator to shorten statements
// #f00 - use shorthand hexidecimals
// red - use colour name if it's shorter than shorthand hexidecimal
// function(f) { setTimeout(f, 16.66); } = use this for requestAnimationFrame (inline)
// a.splice(-3) = splice the last 3 elements from an array (always returns an array)
// a.slice(-3) = slice the last 3 elements from an array (always returns an array)
// c.width = c.width = clear the canvas

c.width = c.height = 600

m();

// Entry point
function m() {
	var 
	i, k, l, temp, suit, deck = [], discard = [], 
	// spade, heart, club, diamond
	suits = ['\u2660','\u2665','\u2663','\u2666'],
	stacks = [], 
	top = 100,
	cardW = 50, cardH = 60,
	cardHSpace = cardW + 25,
	cardVSpace = 20,
	clicked

	// Make deck
	for (i = 51; ~i; i--) {
		temp = (i%13)+1
		suit = suits[k = (i/13)>>0]
		deck[i] = [((temp == 1 ? 'A' : temp)+suit), k, temp, 0]
	}

	// Shuffle
	deck = deck.sort(function () {
		return Math.random() < 0.5 ? -1 : 1
	})

	// Deal
	for (i = 0, l = 7; i < l; i++) {
		for (k = i; k < l; k++) {
			(stacks[k] = stacks[k] || []).push(temp = deck.pop())
			temp[3] = i == k
		}
	}

	// Make space for 'Aces' stacks
	stacks.push([],[],[],[])
	
	// Handle mouse up
	c.addEventListener('mouseup', function (e) {
		var 
		cc, 
		mx = e.clientX,
		my = e.clientY,
		cx, cy,
		r = c.getBoundingClientRect()
		clicked = 0
		
		mx -= r.left;
		my -= r.top;

		function check() {
			return mx >= cx && mx <= cx + cardW && my >= cy && my <= cy + cardH
		}
		
		// Check for a click on a card in the playing field
		for (i = 6; ~i; i--) {
			for (k = stacks[i].length-1; ~k; k--) {
				cc = stacks[i][k]
				cx = cardHSpace * i
				cy = top + k * cardVSpace
				
				// If card is face down then break
				if (!cc[3]) break
				
				if (check()) {
					return clicked = [cc, stacks[i], k]
				}
			}
		}

		// Check for a click on the deck
		cx = cardHSpace * 6
		cy = 0
		if (check()) {
			return clicked = 1
		}

		// Check for a click on the discard pile
		cx = cardHSpace * 7
		cy = 0
		k = discard.length - 1
		cc = discard[k]
		if (check()) {
			clicked = [cc, discard, k]
		}
	})

	function renderCardFaceUp(card, x, y) {
		card[3] = 1
		a.save()
		a.fillStyle = '#fff'
		a.fillRect(x, y, cardW, cardH)
		a.strokeRect(x, y, cardW, cardH)
		a.fillStyle = card[1]%2 ? 'red' : '#000'
		a.translate(x + 5, y + 20)
		a.scale(2, 2)
		a.fillText(card[0], 0, 0)
		a.restore()
	}

	// Update loop
	function update(x,y,s,p) {
		c.width = 600

		// Update
		// Deck clicked
		if (clicked == 1) {
			if (deck.length) {
				discard.push.apply(discard, deck.splice(-3).reverse())
			} else {
				deck = discard.slice()
				deck.reverse()
				discard = []
			}
		// A card was clicked
		} else if (clicked) {
			temp = clicked[0]
			for (i = 10; ~i; i--) {
				s = stacks[i]
				k = s[s.length - 1]

				// Test the 'Aces' stacks
				if (i > 6) {
					if (clicked[2] == clicked[1].length - 1 &&
						((!k && temp[2] == 1) || (
						k &&
						temp[1] == k[1] &&
						temp[2] == k[2]+1))) {
						p = 1
					}
				// Click on a king and stack is empty
				} else if (!k &&
					temp[2] == 13) {
					p = 1
				// Click on any other card
				} else if (k &&
					temp[1]%2 != k[1]%2 &&
					temp[2] == k[2]-1) {
					p = 1
				}

				// Did we pass? (i.e. find a spot for the card)
				if (p) {
					if (p = clicked[1][clicked[2] - 1]) p[3] = 1
					s.push.apply(s, clicked[1].splice(clicked[2]))
					break
				}
			}
		}

		a.fillStyle = 'red'

		// Render stacks
		for (i = 10; ~i; i--) {
			for (k = 0, l = stacks[i].length; k < l; k++) {
				temp = stacks[i][k]
				x = cardHSpace * (i%7)
				y = i > 6 ? 0 : top + cardVSpace * k

				if (temp[3]) {
					renderCardFaceUp(temp, x, y)
				} else {
					a.fillRect(x, y, cardW, cardH)
					a.strokeRect(x, y, cardW, cardH)
				}
			}
		}

		// Render deck
		x = cardHSpace * 6
		y = 0
		if (deck.length) {
			a.fillRect(x, y, cardW, cardH)
		}
		a.strokeRect(x, y, cardW, cardH)

		// Render top card on discard pile
		if (discard.length) {
			renderCardFaceUp(discard[discard.length - 1], cardHSpace * 7, 0)
		}

		clicked = 0
		setTimeout(update, 16.66)
	}
	update()
}