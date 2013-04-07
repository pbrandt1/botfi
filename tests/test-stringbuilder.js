sb_init = require('../lib/stringbuilder.js');

/*
 * Test adding static objects ------------------------------------------
 */
module.exports = {
	"append strings": function(test) {
		test.expect(1);
		var sb = sb_init.stringbuilder();
		sb.append('go irish');
		sb.append(' beat trojans');
		sb.then(function(value) {
			test.equal(value, 'go irish beat trojans');
			test.done();
		});
	},
	"append random shit by calling the toString() method": function(test) {
		test.expect(1);
		var sb = sb_init.stringbuilder();
		sb.append([1, 2])
		sb.append(' batman time');
		sb.then(function(value) {
			test.equal(value, '1,2 batman time');
			test.done();
		});
	},
	"appendLine": function(test) {
		test.expect(1);
		var sb = sb_init.stringbuilder();
		sb.append('George R. R. Martin')
		sb.appendLine();
		sb.appendLine('A Song of Ice and Fire');
		sb.append('Game of Thrones');
		test.equal(sb.toString(), 'George R. R. Martin\nA Song of Ice and Fire\nGame of Thrones');
		test.done();
	},
	"append big chars": function(test) {
		test.expect(1);
		var sb = sb_init.stringbuilder();
		var a = [];
		sb.append('\ud834\udd1e clef');
		a.push('\ud834\udd1e clef');
		for (var i = 0; i < 20; i++) {
			sb.append('\ud834\udd1e ');
			a.push('\ud834\udd1e ');
		}
		test.equal(sb.toString(), a.join(''));
		test.done();
	},
	"chaining": function(test) {
		test.expect(1);
		var sb = sb_init.stringbuilder();
		sb.append('bud light ').append('lime!');
		test.equal(sb.toString(), 'bud light lime!');
		test.done();
	},
	"append q promise": function(test) {
		test.expect(1);
		q = require('q');
		var sb = sb_init.stringbuilder();
		d = q.defer();
		sb.append(d.promise);
		setTimeout(function() {}, 10);

		d = q.fcall(function() { return 'beer' });
		test.done();
	}
}
