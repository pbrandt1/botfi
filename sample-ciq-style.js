// sample of what a traditional (ciq-style) sql builder would look like
// It looks synchronous, but it could be bound with promises internally
// the getJSON() method could return a q promise

botfi = require('botfi');
screening = require('screening');
screening.data.prime = botfi.connect(capitalIQ.data.primeConnection);

// initialization
var sql = botfi.sql();

// Select columns
sql.selectItems.push('companyId');
sql.selectItems.push('c.companyNamePlus as name');
sql.selectItems.push({
	tableAlias: 'fi',
	column: 'dataItemValue',
	columnAlias: 'EBITDA'
});
sql.selectItems.push(botfi.caseStatement([
	{
		condition: 'fi.dataItemValue < 0',
		value: '0',
	},
	{
		condition: 'fi.dataItemValue is null',
		value: '0'
	}
]));

// edit the From clause
sql.from = 'company_tbl c with (nolock)';
sql.from = 'company_tbl';
sql.from.alias = 'c';
sql.from.nolock = 'true';
sql.from.hints.push('nolock');
sql.from.hints.push(botfi.hints.nolock);
sql.from.hints.push(botfi.hints.noLock); // case-insensitive keys

// Add joins
sql.joins.push({
	'table': 'investmentType_tbl',
	'alias': 'i',
	'type': 'inner',
	'hints': ['nolock'],
	'nolock': true
});
sql.joins.get('i').type = botfi.joins.leftOuter;
sql.selectItems.push('i.investmentType');

// Add where clauses
sql.where.push({
	'alias': 'i',

// Get data
// let's imagine the user has a promise called 'getMyShit'
sql.getJSON().then(getMyShit.resolve())

