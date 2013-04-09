json_init = require('../lib/objectBuilder.js').json_init;
q = require('q');
jQuery = require('jquery');
rsvp = require('rsvp');
when = require('when');

s = 'A Song of Ice and Fire';
ss = '\ud834\udd1e clef';
n = 1986;
a = [s, ss, n];
o = {"s": s, "ss": ss, "n": n, "a": a, o: {"s": s, "a": a}};

objectEquals = function(a, b) {
	var p;
	var returnValue = true;
	for(p in b) {
		if(typeof(a[p])=='undefined') {returnValue = false;}
	}

	for(p in b) {
		if (b[p]) {
			switch(typeof(b[p])) {
				case 'object':
					if (!objectEquals(b[p],a[p])) { returnValue = false; } break;
				case 'function':
					if (typeof(a[p])=='undefined' ||
							(p != 'equals' && b[p].toString() != a[p].toString()))
						returnValue =  false;
					break;
				default:
					if (b[p] != a[p]) { returnValue = false; }
			}
		} else {
			if (a[p])
				returnValue = false;
		}
	}

	for(p in a) {
		if(typeof(b[p])=='undefined') {returnValue = false;}
	}
	if (returnValue === false) {
		console.log(a);
		console.log('!=');
		console.log(b);
	}
	return returnValue;
}

module.exports = {
	"add static stuff": function(test) {
		test.expect(1);
		var json = json_init();
		json.s = s;
		json.n = n;
		json.a = a;
		json.o = o;
		test.ok(objectEquals(json.valueOf(), {s: s, n: n, a: a, o: o}));
		test.done();
	}, 
	"add a q deferred": function(test) {
		test.expect(1);
		var json = json_init();
		json.s = s;
		json.n = n;
		json.a = a;
		json.o = o;
		var d = q.defer();
		json.p = d.promise;
		setTimeout(function() {
			d.resolve('I promise to deliver this text');
		}, 100);
		json.then(function(value) {
			test.ok(objectEquals(value, {s:s, n:n, a:a, o:o, p:'I promise to deliver this text'}));
			test.done();
		});
	},
	"add a jQuery deferred": function(test) {
		test.expect(1);
		var json = json_init();
		json.s = s;
		json.n = n;
		json.a = a;
		json.o = o;
		var d = jQuery.Deferred();
		json.p = d.promise();
		setTimeout(function() {
			d.resolve('I promise to deliver this text');
		}, 100);
		json.then(function(value) {
			test.ok(objectEquals(value, {s:s, n:n, a:a, o:o, p:'I promise to deliver this text'}));
			test.done();
		});
	},
	"add an RSVP promise": function(test) {
		test.expect(1);
		var json = json_init();
		json.s = s;
		json.n = n;
		json.a = a;
		json.o = o;
		var p = new rsvp.Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve('I promise to deliver this text');
			}, 100);
		});
		json.p = p;
		json.then(function(value) {
			test.ok(objectEquals(value, {s:s, n:n, a:a, o:o, p:'I promise to deliver this text'}));
			test.done();
		});
	},
	"add a when.js promise": function(test) {
		test.expect(1);
		var json = json_init();
		json.s = s;
		json.n = n;
		json.a = a;
		json.o = o;
		var d = when.defer();
		setTimeout(function() {
				d.resolve('I promise to deliver this text');
		}, 100);
		json.p = d.promise;
		json.then(function(value) {
			test.ok(objectEquals(value, {s:s, n:n, a:a, o:o, p:'I promise to deliver this text'}));
			test.done();
		});
	}
}




/*

json = json_init();

json.s = "some static string";
json.hatSize = getUsersHatSize(); // returns a promise
json.then(function(value) {
	console.log('done........');
	console.log(value);
	json.weapon = 'wits';
	console.log(json.then);
}).then(function() {console.log(json)});

debugger;
json.then(function() {
	console.log('winning');
});
json.then(function() {
	console.log('still winning');
});

function getUsersHatSize() {
	var d = q.defer();
	setTimeout(function() {
		d.resolve({size: 12.5, units: 'cm'});
	}, 2000);
	return d.promise;
}
*/
