## TODOs

* if path extras are set by setPath() call, then let them stand on next calls
* path, setPath, activePath 
* for params merging pick out just the params used by each method
* in namespace-firebase there is a path with two global vars, have an explicit test for that
* rewrite configurable path tests
* think about getting rid of proxy and just bind functions to this

## DONEs

* ResourceApi() could be taken outside of resourceApiBuilder
* for the above, the paramsArray can be used in method calls instead of actual arrays