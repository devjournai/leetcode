/**
 * Immutability Helper
 * Intuition: Utilize JavaScript Proxies to intercept property access and modifications. Implement a copy-on-write strategy where objects/arrays are deep-copied only when they are first accessed for mutation, ensuring the original object remains untouched while building a new mutated version.
 * Approach: 1. Initialize `ImmutableHelper` with the original object. 2. In `produce` method, create a root-level wrapper object that initially points to the original object. This wrapper facilitates reassigning the root object if it's entirely replaced. 3. Define a recursive `wrapAndTrackChanges` function that creates a Proxy for a given object. 4. The Proxy's `get` handler returns the actual value for primitives, or another Proxy for nested objects/arrays. This nested Proxy is created with a `entityUpdateCallback` that knows how to update its parent. 5. The Proxy's `set` handler calls its `entityUpdateCallback` to apply the mutation. This callback handles checking if the target object is still original. If so, it first makes a shallow copy of the object, then recursively calls its *own* `entityUpdateCallback` (which is for its parent) to update the reference to the new copy, then applies the mutation, and finally returns the updated object. 6. The `mutatorFunction` is called with the top-level proxy for the original data. 7. The `produce` method returns the final mutated object from the root-level wrapper.
 * Dry Run: originalObj = {"x": 5, "y": {"z": 10}}
 *         helper = new ImmutableHelper(originalObj);
 *         newObj = helper.produce((proxyReference) => {
 *           proxyReference.x = proxyReference.x + 1;
 *           proxyReference.y.z = proxyReference.y.z * 2;
 *         });
 *
 *         1. `produce` starts. `clonedObjectBlueprint` = `{"x": 5, "y": {"z": 10}}`. `originalDataReference` = `{"x": 5, "y": {"z": 10}}`.
 *         2. `topLevelMutableWrapper` = `{ content: {"x": 5, "y": {"z": 10}} }`. `topLevelOriginalWrapper` = `{ content: {"x": 5, "y": {"z": 10}} }`.
 *         3. Call `wrapAndTrackChanges(topLevelMutableWrapper, topLevelOriginalWrapper, rootUpdateFunc)`. `rootUpdateFunc` updates `topLevelMutableWrapper.content`.
 *         4. `mutatorProxyTarget` becomes a proxy for `{"x": 5, "y": {"z": 10}}` (the `content` of `topLevelMutableWrapper`).
 *         5. `mutatorFunction(mutatorProxyTarget)` executes:
 *            - `proxyReference.x = proxyReference.x + 1;`
 *              - `get` on `x`: returns `5`.
 *              - `set` on `x` with `6`. The `set` handler for `mutatorProxyTarget`'s proxy is invoked.
 *              - `mutableEntity` (local variable in `wrapAndTrackChanges` representing `topLevelMutableWrapper.content`) will be updated by its `entityUpdateCallback`.
 *              - Since `mutableEntity` (the object `{"x": 5, "y": {"z": 10}}`) is still `originalDataReference`, it's copied: `clonedObjectBlueprint` becomes `{"x": 5, "y": {"z": 10}}` (new object).
 *              - `rootUpdateFunc('content', clonedObjectBlueprint)` is called. `topLevelMutableWrapper.content` now points to the new copy.
 *              - `clonedObjectBlueprint.x = 6;` is applied.
 *              - `mutableEntity` (the closure variable) is updated to point to this `clonedObjectBlueprint`.
 *              - `topLevelMutableWrapper.content` is now `{"x": 6, "y": {"z": 10}}` (the original `y` still referenced).
 *            - `proxyReference.y.z = proxyReference.y.z * 2;`
 *              - `get` on `y`:
 *                - `mutableValueAtPath` = `{"z": 10}` (from `clonedObjectBlueprint`). `originalValueAtPath` = `{"z": 10}` (from `originalDataReference`).
 *                - Recursive call to `wrapAndTrackChanges(mutableValueAtPath, originalValueAtPath, nestedCallback)`.
 *                - `nestedCallback` is defined: if `{"z": 10}` (its `mutableEntity`) is copied, it updates its parent (`clonedObjectBlueprint.y`) and returns the copy.
 *                - A proxy for `{"z": 10}` (let's call it `yProxy`) is returned.
 *              - `get` on `yProxy.z`:
 *                - `mutableValueAtPath` = `10`. Returns `10`.
 *              - `set` on `yProxy.z` with `20`. The `set` handler for `yProxy` is invoked.
 *              - `mutableEntity` (for `yProxy`, which is `{"z": 10}`) will be updated by its `entityUpdateCallback` (`nestedCallback`).
 *              - `nestedCallback` (for `yProxy`): `mutableValueAtPath` (the `{"z": 10}` from `clonedObjectBlueprint`) is still `originalValueAtPath` (`{"z": 10}` from `originalDataReference`).
 *              - Copy `{"z": 10}`: `yCopy` = `{"z": 10}` (new object).
 *              - Call `entityUpdateCallback` of the *parent* `wrapAndTrackChanges` (which is for `clonedObjectBlueprint`). `clonedObjectBlueprint` is updated to point its `y` to `yCopy`.
 *              - `yCopy.z = 20;` is applied.
 *              - `mutableEntity` (for `yProxy`) is updated to `yCopy`.
 *         6. `mutatorFunction` completes.
 *         7. `produce` returns `topLevelMutableWrapper.content`, which is `{"x": 6, "y": {"z": 20}}`.
 *         8. `originalObj` remains `{"x": 5, "y": {"z": 10}}`.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var ImmutableHelper = function (initialImmutableObject) {
  this.initialDataStore = initialImmutableObject;
};

ImmutableHelper.prototype.produce = function (mutatorFunction) {
  const topLevelMutableWrapper = { rootContent: this.initialDataStore };
  const topLevelOriginalWrapper = { rootContent: this.initialDataStore };

  const mutatorProxyTarget = wrapAndTrackChanges(
    topLevelMutableWrapper,
    topLevelOriginalWrapper,
    (fieldIdentifier, fieldValue) => {
      topLevelMutableWrapper[fieldIdentifier] = fieldValue;
      return topLevelMutableWrapper;
    }
  ).rootContent;

  mutatorFunction(mutatorProxyTarget);

  return topLevelMutableWrapper.rootContent;

  function wrapAndTrackChanges(
    mutableEntityContainer,
    originalEntityContainer,
    entityUpdateCallback
  ) {
    let currentMutableObject = mutableEntityContainer;
    let currentOriginalObject = originalEntityContainer;

    return new Proxy(currentMutableObject, {
      set(proxyHandlerTarget, propertyKey, assignedPropertyNewValue) {
        currentMutableObject = entityUpdateCallback(
          propertyKey,
          assignedPropertyNewValue
        );
        return true;
      },

      get(proxyHandlerTarget, propertyKey) {
        let mutableValueAtPath = currentMutableObject[propertyKey];
        let originalValueAtPath = currentOriginalObject[propertyKey];

        if (
          mutableValueAtPath === null ||
          typeof mutableValueAtPath !== "object"
        ) {
          return mutableValueAtPath;
        } else {
          return wrapAndTrackChanges(
            mutableValueAtPath,
            originalValueAtPath,
            (nestedKeyToSet, nestedValueToAssign) => {
              if (mutableValueAtPath === originalValueAtPath) {
                mutableValueAtPath = Array.isArray(mutableValueAtPath)
                  ? [...mutableValueAtPath]
                  : { ...mutableValueAtPath };

                currentMutableObject = entityUpdateCallback(
                  propertyKey,
                  mutableValueAtPath
                );
              }
              mutableValueAtPath[nestedKeyToSet] = nestedValueToAssign;
              return mutableValueAtPath;
            }
          );
        }
      },
    });
  }
};
