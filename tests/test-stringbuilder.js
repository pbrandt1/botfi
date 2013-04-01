sb = require('../lib/stringbuilder.js');

/*
 * Test adding static objects ------------------------------------------
 */
test("sb.push(?)", function() {
	sb.push('go irish');
	equal(sb.toString(), 'go irish');
	sb.push(' beat trojans');
	equal(sb.toString9), 'go irish beat trojans');
});
