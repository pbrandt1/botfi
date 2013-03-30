Q = require("q");

/* 
 * Define functions which return promises.  These will be used to test
 */

// Returns just a promise with a string value
textPromise = function(t) {
	return Q.fcall(function() {
		return t;
	})
}

// Returns a promise with a string value which is automatically resolved
// after a ms milliseconds
delayTextPromise = function(t, ms) {
	var p = textPromise(t);
	setTimeout(function() {
		p.done();
	}, ms);
	return p;
}


/* 
 * Define the internals of the promise-bound stringbuilder
 */
 
/*
  text = [] array of objects with the form 
	{
		text, 
		position, 
		promise,
		internalPromise
	}
*/
var text = [];

// current position in the array
var i = 0

var ilock = 0; // locking not implemented (single-threaded so far)

// function which either adds plaintext or a promise-bound value to the
// text array
function Append(t) {
	// if it's a string, just add it inline
	if (typeof t === 'string'
		  || typeof t === 'number') {
		addText(t);
	} 
	// deferred
	else if (typeof t.promise === 'object') {
		addTextPromise(t.promise);
	}
	// straight-up promise
	else if (typeof t.done === 'function') {
		addTextPromise(t);
	}
	else {
		console.log('unhandled object');
	}
}

// Adds text w/o promise. Useful for statically defined text
function addText(t) {
	text.push({
		"text": t,
		"position": i
	});
	i++; // PMB race condition if multithreaded
}

// Adds the text which is returned by a promise
function addTextPromise(p) {
	text.push({
		"position": i,
		"promise": p
	});
	i++;
	p.then(function(value) {
		text.forEach(function(o, pos) {
			if (o.promise && o.promise === p){
				o.text = value;
			}
		});
	});
}

// Prints the built string
function printText() {
	text.forEach(function(o, p) {
		console.log(o.text);
	})
}

/*
 * Test it out
 */

Append('Starting this string builder');
Append('Continuing this string builder');
p1 = textPromise('I PROMISE I will deliver this text');
Append(p1);
Append('Continuing this string builder... again!');
printText(); // should print undefined in the third line

// try it after a promise is done
p1.then(function() {
	console.log('p1 is done');
	printText();
});
p1.done();
