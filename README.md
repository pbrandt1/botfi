botfi
=====

Use MySql in Node.js with Ease, Joy, and Promises

* Write async sql builders through Q promises
* build your queries through an old-fashioned sql builder
* get back your data in handy formats
* set up error logging or query logging
* sets up pools for you
* pretty prints sql
* eats scrap metal for breakfast

Technical details
--------------------
* Strictly use connection pools
* Handle all connections/releases internally on query submit
* Allow MySql and TSQL connection pools

How to Use
--------------------
botfi = require('botfi');
sql = botfi.sql();
sql.SelectItems.Add('c.companyId');
