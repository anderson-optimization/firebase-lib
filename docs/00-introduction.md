## `firebase-lib` Documentation

### Introduction

The library builds on [Firebase][b] and [Angular Fire][a] software development 
kits (SDKs) and facilitates a simplified way of interfacing with the database.
The software provides a mechanism to abstract subsets of data as resources and
alias their direct paths declaratively in definition files.  The aliases can be
nested within other aliases, permitting namespacing of related resources
irrespective of the hierarchy within which their data is stored.  The subsets
can then be interacted with by invoking appropriate methods to fetch or mutate
the data.  Multiple resources may have equal path elements and oftentimes the
same resource's path may have to be altered repeatedly depending, for example,
on user input.  `firebase-lib` allows path variables to capture access
changeability.  Global variables are interpolatable across all paths.  Local
variables are substitutable only at a specific resource. Globals can likewise be
targetedly assigned.  The simplest path alteration available is appending and
then, if necessary, truncating sub-paths. The library provides functionality for
presetting path parts or changing them at the time of a data method invocation.
For use cases that require multiple instances of the same resource, but with
specific settings, `firebase-lib` can be used to clone a resource and then each
duplicate can be altered to a desired state.  Beyond just path configurability,
the library can preset every input for the data methods globally.  Fixing query
or path parameters at the application level is unlikedly to be necessitated.
However, preconfiguring data return options or the type of observable that an
Angular Fire method produces can be useful.  Parameter prefilling can also be
accomplished at the resource level programmatically and declaratively.  Both
global and local presets are overridable at the time of method execution.
Working with a lot of resources that use global variables may lead to memory
leaks, because each definition is registered with an index.  For the last set of
features, `firebase-lib` makes methods available to clear these registries once
resource instances are no longer needed.

---

[Table of Contents](../README.md) :palm_tree:
[Next (Library Installation)](./01-usage-installation.md)

[a]: https://github.com/angular/angularfire
[b]: https://firebase.google.com/docs/reference/js/v8/firebase
