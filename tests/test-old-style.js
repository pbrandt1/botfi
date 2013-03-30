console.log('\nbeginning old-style sql builder syntax tests');
console.log(new Date() + '\n');

// ------------------------------------
// Check for syntax fuck-ups


botfi = require('botfi');

selectTest1 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('companyId');
	sql.debug();
};

selectTest2 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('c.companyId');
	sql.debug();
};

selectTest3 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('c.companyId as monkeyNut');
	sql.debug();
};

selectTest4 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId'
	});
	sql.debug();
};

selectTest5 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId',
		tableAlias: 'c'
	});
	sql.debug();
};

selectTest6 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId'
		tableAlias: 'c',
		columnAlias: 'monkeyNut'
	});
	sql.debug();
};

selectTest111 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('companyId');
	sql.debug();
};

selectTest112 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('c.companyId');
	sql.debug();
};

selectTest13 = function(){
	var sql = botfi.sql();
	sql.selectItems.add('c.companyId as monkeyNut');
	sql.debug();
};

selectTest14 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId'
	});
	sql.debug();
};

selectTest15 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId',
		tableAlias: 'c'
	});
	sql.debug();
};

selectTest16 = function(){
	var sql = botfi.sql();
	sql.selectItems.add({
		column: 'companyId'
		tableAlias: 'c',
		columnAlias: 'monkeyNut'
	});
	sql.debug();
};

