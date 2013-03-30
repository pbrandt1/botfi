Q = require("q");


delay = function(ms) {
	var deferred = Q.defer();
	setTimeout(function() {
		console.log('delay over');
		deferred.resolve();
	}, ms);
	return deferred.promise;
}

a = [];

a.push('Dear Sir, ');

delayText = function(t, ms) {
	setTimeout(function(){
		return t;
	}, ms);
}

delayTextPromise = function(t, ms) {
	deferred = Q.defer();
	setTimeout(function() {
		deferred.resolve();
	}, ms);
	return deferred.promise;
}


// array of promises
ap = [];

// holds the text.  
/*
  array of objects with the form 
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

var ilock = 0;

//var textPromise = Q.promise();

function addText(t) {
	text.push({
		"text": t,
		"position": i
	});
	i++; // PMB race condition if multithreaded
}


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

teepee = function(t) {
	return Q.fcall(function() {
		return t
	})
}


addText('Starting this string builder');
addText('Continuing this string builder');
p1 = teepee('I PROMISE I will deliver this text');
addTextPromise(p1);
addText('Continuing this string builder... again!');
p1.then(function() {
	console.log('p1 is done');
	printText();
});


function printText() {
	text.forEach(function(o, p) {
		console.log(o.text);
	})
}
printText();

p1.done();
