sb = function() {


	/*
	 * Define the internal components (not visible in exports) -----------
	 */

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

	// The current position in the array of snippets
	var i = 0;

	// Adds a promise which hopefully returns text to s
	AppendPromise = function(p) {
		setPromiseResolver(promise, index);
		s.push({
				"position": i++,
				"promise": p
		});
	}

	// Helper function to set the text when a promise resolves
	setPromiseResolver = function(promise, index) {
		promise.then(function(value) {
			s[index].text = value;
		});
	}

	// Adds a static object via the toString() method
	AppendText = function(o) {
		s.push({
				"text": o.toString(),
				"position": i++
		});
	}

	/*
	 * Define the user-facing components ---------------------------------
	 */

	// Adds an object to the array which hopefully returns text
	Append = function(o) {
		// It's a promise.  Hopefully it returns text
		if (typeof o.done === 'function') {
			AppendPromise(o);
		}
		// It's a deferred.  Hopfully the underlying promise returns text
		else if (typeof o.promise === 'object' 
				&& typeof o.promise.done === 'function') {
			AppendPromise(o.promise);
		}
		// Most likely safe to add blindly
		else if (typeof o === 'string'
				|| typeof o === 'number') {
			AppendText(o);
		}
		// Hope to dear god that the object's toString() method returns 
		// something better than "[object Object]"
		// TODO error handling
		else {
			AppendText(o);
		}
	}

	// Returns the string, whether promises are finished or not
	toString = function() {
		var a = [];
		s.forEach(function(o) {
			a.push(o.text);
		});
		return a.join('');
	}

	return {
		"push": Append,
		"toString": toString
	}
};

exports.stringbuilder = sb;
