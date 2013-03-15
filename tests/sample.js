// a sample of code i would like to be able to write with botfi

botfi = require('botfi');
screening = require('screening');
screening.data.prime = botfi.connect(capitalIQ.data.primeConnection);

var sql = botfi.sql();
sql.selectItems.push('companyId');
sql.selectItems.push('companyNamePlus');
sql.from = 'company_tbl c with (nolock)';
// ALTERNATIVELY:
sql.from = 'company_tbl';
sql.from.alias = 'c';
sql.from.nolock = 'true';
sql.from.hints.push('nolock');
sql.from.hints.push(botfi.hints.nolock);
sql.from.hints.push(botfi.hints.noLock);
sql.joins.push({
	'table': 'investmentType_tbl',
	'alias': 'i',
	'type': 'inner',
	'hints': ['nolock'],
	'nolock': true
});
sql.joins.get('i').type = botfi.joins.leftOuter;
sql.selectItems.push('i.investmentType');

sql.where.push({
	'alias': 'i',

