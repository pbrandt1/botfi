// sample of what a c#- or java-style sql builder would look like
// It handles static values and promises.  

botfi = require('botfi');
screening = require('screening');
// Assume screening.data.primeConnection is an object containing the basic
// database connection parameters like username and catalog etc
screening.data.prime = botfi.connect(screening.data.primeConnection);

// initialization.  Default sql format.  
var sql = botfi.sql();

// Select columns
sql.selectItems.push('companyId');
sql.selectItems.push('c.companyNamePlus as name');
// can add a promise which will add one or more columns
sql.selectItems.push(getUsersAdditionalColumns());
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
// dynamic switching of join types
sql.joins.get('i').type = botfi.joins.leftOuter;
sql.selectItems.push('i.investmentType');

// Add where clauses.  getSecurityClause() returns a promise
sql.where.push(getSecurityClause());

// Get data and apply it elsewhere
// sql.getJSON is shorthand for sql.then(function(value) { getJSON(....
sql.getJSON(screening.data.prime)
.then(function(value) {
	applyToTemplate(value, screening.templates.results)
});

