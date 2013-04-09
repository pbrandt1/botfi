j_init = function(o) {
	var makeObject = function(obj) {
		if (typeof obj === 'undefined') {
			return {};
		} else {
			var otype = Object.prototype.toString.call(obj);
			if (otype === '[object Object]') {
				return obj;
			} else if (otype === '[object Array]'
					|| otype === '[object Number]'
					|| otype === '[object String]'
					|| otype === '[object Boolean]') {
				return { 0: obj };
			}
		}
	}

	var q = require('q');

	var getAllPromises = function(obj, path) {
		var a = [];
		var keys;

		if (q.isPromise(obj)) {
			a.push(q.when(obj).then(function(value) {
				console.log('meow the replacement kitty strikes!');
				console.log('  ' + path + ' = ' + JSON.stringify(value));
				eval(path + ' = ' + JSON.stringify(value));
			}));
		} else {
			try {
				keys = Object.keys(obj);
			} catch(e) {}
			if (keys) {
				keys.forEach(function(k) {
					a = a.concat(
						getAllPromises(obj[k], path+'['+JSON.stringify(k)+']')
					);
				});
			} 
		}
		return a;
	}

	var getAllPromisesButMe = function(obj) {
		var a = [];
		Object.keys(obj).forEach(function(k) {
			a = a.concat(getAllPromises(obj[k], 'o.'+k));
		});
		return a;
	}

	// Turn o into an object
	o = makeObject(o);

	var thenHandler = function(f) {

		var a = getAllPromisesButMe(o);
		var d = q.defer();
	}

	// Returns the a deep copy of the object with all the promises stripped
	// out
	o.valueOf = function() {
		function copy(o) {
			var obj = {};
			var prop;
			var type;
			for (prop in o) {
				type = Object.prototype.toString.call(o[prop]);
				if (o.hasOwnProperty(prop) 
						&& prop !== 'valueOf' && prop !== 'then'
						&& type === '[object Object]') {
					obj[prop] = copy(o[prop]);
				} else if (prop !== 'valueOf' && prop !== 'then') {
					obj[prop] = o[prop];
				}
			}
			return obj;
		}
		return copy(o);
	}

	// call the function after all promises in the object have resolved
	o.then = function(f) {
		var a = getAllPromisesButMe(o);
		var deferred = q.defer();
		q.all(a).then(function() {
			deferred.resolve(o.valueOf());
		})
		return deferred.promise.then(f);
	}

	return o;
}

exports.json_init = j_init;
