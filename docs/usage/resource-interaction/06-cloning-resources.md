## `firebase-lib` Documentation

### Cloning Resources

Sometimes copies of resources may be necessary with minor variations.  One
possible approach is to have a base resource with all the necessary presets.
The resource is then cloned and each of the replicas is modified to represent a
desired state.

```javascript
let {projectInfo} = resources;
let path = [['$uid', '22'], ['#teamId', '7']];
projectInfo.updatePathTemplate(path);

let copyConfigs = projectInfo.clone();
let copyStyles = projectInfo.clone();
let copyComments = projectInfo.clone();

copyConfigs.updatePathTemplate('configs');
copyStyles.updatePathTemplate('styles');
copyComments.updatePathTemplate('comments');

let p1 = copyConfigs.get();
let p2 = copyStyles.get();
let p3 = copyComments.get();

let [{value: configs}, {value: styles}, {value: comments}] = await Promise.all([p1, p2, p3]);
```

---

[Previous (Querying Resources)](./11-querying-resources.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Other Resource Interactions)](./13-other-resource-interactions.md)
