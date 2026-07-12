/**
 * Make Object Immutable
 * Intuition: Recursively apply Proxy to intercept property access and modification, throwing errors for mutation attempts and preserving immutability.
 * Approach: 1. Define a set of mutating array methods. 2. Create a top-level Proxy for the input object. 3. Implement the 'set' trap to throw errors for any property assignment. 4. Implement the 'get' trap to:    a. Retrieve the actual property value.    b. If the value is a function, return a new Proxy around it; this inner Proxy's 'apply' trap checks if the function is a forbidden mutating array method and throws an error if so, otherwise calls the original function.    c. If the value is an object (and not null), recursively call makeImmutable on it to ensure deep immutability.    d. For all other types (primitives), return the value directly.
 * Dry Run: Input: { "a": 1, "b": [2, 3] }
 * `makeImmutable({ "a": 1, "b": [2, 3] })` is called.
 * A `mainProxy` is created for `{ "a": 1, "b": [2, 3] }`.
 * If `mainProxy.c = 4;` is attempted:
 * `set` trap on `mainProxy` is triggered. `currentTarget` is `{ "a": 1, "b": [2, 3] }`, `propertyToSet` is "c".
 * `Array.isArray(currentTarget)` is false.
 * `throw "Error Modifying: c"`.
 * If `mainProxy.b.push(4);` is attempted:
 * `get` trap on `mainProxy` is triggered for "b".
 * `retrievedTarget` is `{ "a": 1, "b": [2, 3] }`, `retrievedKey` is "b".
 * `accessedItem` becomes `[2, 3]`.
 * `typeof accessedItem === 'function'` is false.
 * `typeof accessedItem === 'object' && accessedItem !== null` is true.
 * `makeImmutable([2, 3])` is called recursively, returning `arrayProxy`.
 * `arrayProxy` is returned from the `mainProxy`'s `get` trap.
 * `arrayProxy.push(4);` is attempted.
 * `get` trap on `arrayProxy` is triggered for "push".
 * `retrievedTarget` is `[2, 3]`, `retrievedKey` is "push".
 * `accessedItem` becomes the native `Array.prototype.push` function.
 * `typeof accessedItem === 'function'` is true.
 * A `functionProxy` is created for `Array.prototype.push`.
 * `functionProxy` is returned from `arrayProxy`'s `get` trap.
 * The `apply` trap of `functionProxy` is triggered with `originalMethod = Array.prototype.push`, `invocationContext = [2, 3]`, `argumentsPassed = [4]`.
 * `forbiddenOperations.has("push")` is true.
 * `throw "Error Calling Method: push"`.
 * If `mainProxy.a` is accessed:
 * `get` trap on `mainProxy` for "a".
 * `accessedItem` is `1`.
 * `typeof accessedItem === 'function'` is false.
 * `typeof accessedItem === 'object' && accessedItem !== null` is false.
 * `1` is returned.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var makeImmutable = function (sourceObject) {
  const forbiddenOperations = new Set([
    "pop",
    "push",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
  ]);

  return new Proxy(sourceObject, {
    set(currentTarget, propertyToSet) {
      if (Array.isArray(currentTarget)) {
        throw `Error Modifying Index: ${propertyToSet}`;
      }
      throw `Error Modifying: ${propertyToSet}`;
    },

    get(retrievedTarget, retrievedKey) {
      const accessedItem = retrievedTarget[retrievedKey];

      if (typeof accessedItem === "function") {
        return new Proxy(accessedItem, {
          apply(originalMethod, invocationContext, argumentsPassed) {
            if (forbiddenOperations.has(retrievedKey)) {
              throw `Error Calling Method: ${retrievedKey}`;
            }
            return Reflect.apply(
              originalMethod,
              invocationContext,
              argumentsPassed,
            );
          },
        });
      }

      if (typeof accessedItem === "object" && accessedItem !== null) {
        return makeImmutable(accessedItem);
      }

      return accessedItem;
    },
  });
};
