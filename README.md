botfi
=====

Use MySql in Node.js with Ease and Joy

* Write async code through Q promises
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


How the Fuck will we implement [feature]?
--------------------------------------
* Sql where clauses?  
> * Almost seems best to have just an array of objects
> * object can be just a string, or another sql query
> * I guess type safety and strict rules aren't necessary
