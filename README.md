## firebase-lib

`firebase-lib` builds upon [Firebase][b] and [Angular Fire][a] software
development kits (SDKs) and facilitates a simplified way for interfacing with
the database.  The software provides a mechanism to abstract subsets of data as
resources and alias their direct paths in definition files.  The aliases can
be nested within other aliases, permitting namespacing of related resources
together irrespective of the hierarchy within which their data is stored.  The
subsets can then be interacted with by invoking appropriate methods to fetch or
mutate the data.  Multiple resources may have equal path elements (e.g., ids)
and oftentimes the same resource's path have to be altered depending, for
example, on user actions.  `firebase-lib` allows global and local variables to
be included in a data path.  Global values can be interpolated across all
resources whose paths include the variables.  Local variables can be substituted
only at the resource-level.

installing

need to have npm registry pointing to github via .npmrc



use cases

* angular
* firebase frontend sdk
* angular on server via TestBed
* firebase-admin


contribution to repo

* minimal ES2021 code
* tests with coverage of 100%
* detailed documentation if appropriate


[a]: https://github.com/angular/angularfire
[b]: https://firebase.google.com/docs/reference/js/v8/firebase