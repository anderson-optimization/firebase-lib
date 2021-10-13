## `firebase-lib` Documentation

### Development Setup

Library development and testing requires a working instance of the database.
The best approach is to run Firebase emulator locally.  Installing and launching
an emulator requires `firebase-tools`.  These can be installed by running the
following command.

```
npm install -g firebase-tools
```

Next, clone the repository and install the dependencies.

```
git@github.com:anderson-optimization/firebase-lib.git
cd firebase-lib
npm install
```

To launch the emulator, invoke the following commands from within `firebase-lib`
directory.

```
cd firebase-emulator
firebase init emulators
firebase emulators:start --project firebase-lib
```

`firebase init emulators` command will need to be run only once.  When running
the command select `Don't set up a default project`.  For emulators select only
`Database Emulator`.  For the rest of the choices select defaults.

`firebase emulators:start` can be started without `--project firebase-lib`.
Running emulator with the project option will launch web interface that can be
used to browse data.

After database emulator is up, go back to `firebase-lib` directory and launch
development mode.

```
ng test
```

Or,

```
ng test --code-coverage
```

---

[Previous (Resource Interaction Examples)](./14-resource-interaction-examples.md) :palm_tree:
[Table of Contents](../README.md) :palm_tree:
[Next (Contributing Changes)](./16-contributing-changes.md)
