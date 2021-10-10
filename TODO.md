## TODOs

* for params merging pick out just the params used by each method
* think about getting rid of proxy and just bind functions to this
* get rid of as much lodash as possible
* make sure correct dependencies are used

## DONEs

* ResourceApi() could be taken outside of resourceApiBuilder
* for the above, the paramsArray can be used in method calls instead of actual arrays
* if path extras are set by setPath() call, then let them stand on next calls (updatePathTemplate())
* * path, setPath, activePath (no just path and pathTemplate, activePath is derived from these)
* in namespace-firebase there is a path with two global vars, have an explicit test for that
* rewrite configurable path tests
