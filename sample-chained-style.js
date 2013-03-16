// An example of building sql shit asyncly using chained promises

botfi = require('botfi');

// botfi.sql returns a promise
json = botfi.sql()
.from('company_tbl') // from also returns a "sql" object/promise
.from({
	'nolock': true,
	'alias': 'c'
})
.addSelectItem('c.' + getSelectItemFromRefData())
.addSelectItem('c.companyName')
.addSelectItem('t.turtleneckColor')
.Join({
	'table': 'companyLogoTurtlenecks_tbl',
	'alias': 't',
	'type': 'inner'
})
.Join({ // this modifies the just-created join above
	'alias': 't', // tells us to modify t if it exists, else throw shit
	'type': 'left outer'
})
.where('c.' + getSelectItemFromRefData() + ' = t.' + getSelectItemFromRefData)
.whereExists(botfi.sql()
	.from('richExecs_tbl r with (nolock)') // smartly parses
	.where('r.associatedCompanyId = c.companyId')
)
.log('DEBUG') // logs pretty printed query as debug level
.getJSON();
