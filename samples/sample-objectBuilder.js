json_init = require('./lib/jsonBuilder.js').json;

json = json_init();

json.s = "some static string";
json.hatSize = getUsersHatSize(); // returns a promise
json.hatSize.units = "inches"; // Dangerous
json.hatSize.then(function() {
	json.hatSize.units = "inches"; // Better
});
json.then(sendData);

// can also init off of an existing object
json2 = json_init(json);

