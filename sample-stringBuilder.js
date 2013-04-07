// Import + variable creation
sb_init = require('./lib/stringBuilder.js');

// append strings
sb = sb_init.stringBuilder();
sb.append('hello').append(' sexy').append(' kitty ;)').appendLine();
sb.append('u r hawt');
sb.then(function(value) {
	console.log(sb.toString()); // hello sexy kitty ;)
});                          	// u r hawt


// append random shit by calling the toString() method
sb = sb_init.stringBuilder();
sb.append([1, 2]).append(' batman time!');
sb.then(function(value) {
	console.log(sb.toString()); // 1,2 batman time!
});

// append 2-char string characters
sb.append('hey there \ud834\udd1e clef');
for (var i = 0; i < 10; i++) {
	sb.append(i).append(' ').append('\ud834\udd1e')
}

// promises
sb = sb_init();
sb.append('{ userId: ');
sb.append(userid);
sb.append(', oneNightStandData: ');
sb.append(getMostRecentOneNightStands(userId))
sb.append('}');
sb.then(sendDataToWeb)
// returns { userId: 311108, oneNightStandData: {} }
// CONTINUE USING THIS sb
sb.append();
