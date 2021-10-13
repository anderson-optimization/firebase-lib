## `firebase-lib` Documentation

### Publishing Npm Package to Github

Publishing `firebase-lib` npm package requires a Github Personal Access token
with permissions to read and publish packages.  The token should be stored in
an environmental variable GITHUB_TOKEN.

Next, run the following commands.

```
npm run build
cd dist/firebase-lib
npm publish
```

---

[Previous (Contributing Changes)](./16-contributing-changes.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Firebase API Methods)](./18-firebase-api-methods.md)
