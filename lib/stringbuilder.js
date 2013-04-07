sb = function() {
	var q = require('q');

	/*
	 * Define the internal components (not visible in exports) -----------
	 */

	// the internal promise which is returned by this function
	var d = q.defer();
	var p = d.promise;

	// s stands for "snippets," it's the atoms that make up the string
	/*
		 s = [] an array of objects with these possible attributes
		 {
		 "text": the text to be added to the string
		 "position": the position of the text
		 "promise": the promise which returns a text
		 }
	 */
	var s = [];

	// array of promises
	var ap = [];

	// The current position in the array of snippets
	var i = 0;

	// Adds a promise which hopefully returns text to s
	appendPromise = function(p) {
		setPromiseResolver(promise, index);
		s.push({
				"position": i++,
		});
		ap.push(p);
	}

	// Helper function to set the text when a promise resolves
	setPromiseResolver = function(promise, index) {
		promise.then(function(value) {
			s[index].text = value;
		});
	}

	// Adds a static object via the toString() method
	appendText = function(o) {
		s.push({
				"text": o.toString(),
				"position": i++
		});
	}

	/*
	 * Define the user-facing components ---------------------------------
	 */

	// Adds an object to the array which hopefully returns text
	append = function(o) {
		// If there's no object, then do nothing
		if (typeof o === 'undefined') {
			return;
		}
		// It's a promise.  Hopefully it returns text
		else if (typeof o.done === 'function') {
			appendPromise(o);
		}
		// It's a deferred.  Hopfully the underlying promise returns text
		else if (typeof o.promise === 'object' 
				&& typeof o.promise.done === 'function') {
			appendPromise(o.promise);
		}
		// Most likely safe to add blindly
		else if (typeof o === 'string'
				|| typeof o === 'number') {
			appendText(o);
		}
		// Hope to dear god that the object's toString() method returns 
		// something better than "[object Object]"
		// TODO error handling
		else {
			appendText(o);
		}
	}

  // appendLine. do i need a pomise here?
	appendLine = function(o) {
		append(o);
		append('\n');
	}

	// Returns the string, whether promises are finished or not
	toString = function() {
		var a = [];
		s.forEach(function(o) {
			a.push(o.text);
		});
		return a.join('');
	}

	// Special then
	Then = function(f) {
		p.then(f);
		q.all(ap).then(function() {
			d.resolve();
		});
	}

	p.push = append;
	p.toString = toString;
	p.append = append;
	p.appendLine = appendLine;

	return p; 
};

exports.stringbuilder = sb;
