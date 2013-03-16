console.log('\nbeginning ciq-style sql builder syntax tests');
console.log(new Date() + '\n');

// ------------------------------------
// Check for syntax fuck-ups


botfi = require('botfi');

selectTest1 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('companyId');
	sql.print();
};

selectTest2 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('c.companyId');
	sql.print();
};

selectTest3 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('c.companyId as monkeyNut');
	sql.print();
};

selectTest4 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId'
	});
	sql.print();
};

selectTest5 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId',
		tableAlias: 'c'
	});
	sql.print();
};

selectTest6 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId'
		tableAlias: 'c',
		columnAlias: 'monkeyNut'
	});
	sql.print();
};
