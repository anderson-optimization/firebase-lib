## `firebase-lib` Documentation

### Publishing Npm Package to Github

Publishing `firebase-lib` npm distributable requires a Github Personal Access
Token with permissions to read and publish packages.  The token should be stored
in an environmental variable `GITHUB_TOKEN`.

To publish the package, run the following commands.

```
npm run build
cd dist/firebase-lib
npm publish
```

---

[Previous (Contributing Changes)](./02-contributing-changes.md) :palm_tree:
[Table of Contents](../../../README.md) :palm_tree:
[Next (`firebase-lib` Exports)](../apis/01-firebase-lib-exports.md)
