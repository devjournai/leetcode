/**
 * Memoize II
 * Intuition: To enable memoization for functions with arbitrary argument types (including objects, functions, and primitives), a consistent and unique key for each argument combination is essential. This is achieved by first mapping every distinct argument value encountered to a unique integer ID, and then concatenating these IDs to form a composite string key for the primary cache.
 * Approach: 1. Declare `primaryCacheStore` as a `Map` to store the computed results of the original function `fn`, with keys generated from argument identifiers. 2. Declare `argumentIdentifierRegistry` as another `Map` to maintain a mapping from each distinct argument value to a unique integer identifier. This ensures that object references are correctly handled (e.g., `{} !== {}` but `obj1 === obj1`). 3. Initialize `nextUniqueIdentifier` as a simple counter to generate sequential unique integer IDs. 4. Define `obtainArgumentIdentifier` function: This internal helper function takes a single `valueToIdentify` as input. It first tries to retrieve an existing ID for this value from `argumentIdentifierRegistry`. If no ID is found, it assigns the current `nextUniqueIdentifier` to the `valueToIdentify` in the `argumentIdentifierRegistry`, increments `nextUniqueIdentifier`, and then returns the newly assigned ID. This "get or create" logic is implemented concisely using the nullish coalescing operator (`??`) and the comma operator for sequential evaluation, avoiding an explicit `if/else` block. 5. Return `memoizedInvoker` function: This is the memoized version of the original `fn` that will be exposed. It accepts `...inputArguments`. 6. Inside `memoizedInvoker`, it iterates through `inputArguments`, calling `obtainArgumentIdentifier` for each one. The resulting individual integer IDs are collected into `keyConstituents` array. 7. These `keyConstituents` are then joined together with a hyphen (`-`) to form the `finalCacheKey` string. 8. The `memoizedInvoker` then checks `primaryCacheStore` using `has(finalCacheKey)` to see if the result for this specific combination of arguments has already been computed and stored. 9. If `finalCacheKey` is found, the `retrievedResult` is fetched using `get(finalCacheKey)` and returned immediately, preventing redundant execution of `fn`. 10. If `finalCacheKey` is not found, the original `fn` is executed with `inputArguments` to compute the `functionOutcome`. This `functionOutcome` is then stored in `primaryCacheStore` under `finalCacheKey` using `set(finalCacheKey, functionOutcome)`. 11. Finally, the `functionOutcome` is returned.
 * Dry Run: For `fn = (firstItem, secondItem) => firstItem + '::' + secondItem`
 *   `memoize(fn)` is called.
 *   Initialization: `primaryCacheStore = new Map()`, `argumentIdentifierRegistry = new Map()`, `nextUniqueIdentifier = 0`.
 *   Returns `memoizedInvoker`.
 *
 *   Call 1: `memoizedInvoker(10, 'alpha')`
 *     `inputArguments = [10, 'alpha']`.
 *     `obtainArgumentIdentifier(10)`: `argumentIdentifierRegistry.get(10)` is `undefined`. Sets `argumentIdentifierRegistry.set(10, 0)`. `nextUniqueIdentifier` becomes 1. Returns 0.
 *     `obtainArgumentIdentifier('alpha')`: `argumentIdentifierRegistry.get('alpha')` is `undefined`. Sets `argumentIdentifierRegistry.set('alpha', 1)`. `nextUniqueIdentifier` becomes 2. Returns 1.
 *     `keyConstituents = [0, 1]`.
 *     `finalCacheKey` becomes "0-1".
 *     `primaryCacheStore.has("0-1")` is false.
 *     `fn(10, 'alpha')` executes, `functionOutcome = "10::alpha"`.
 *     `primaryCacheStore.set("0-1", "10::alpha")`.
 *     Returns "10::alpha".
 *
 *   Call 2: `memoizedInvoker('beta', 20)`
 *     `inputArguments = ['beta', 20]`.
 *     `obtainArgumentIdentifier('beta')`: `argumentIdentifierRegistry.get('beta')` is `undefined`. Sets `argumentIdentifierRegistry.set('beta', 2)`. `nextUniqueIdentifier` becomes 3. Returns 2.
 *     `obtainArgumentIdentifier(20)`: `argumentIdentifierRegistry.get(20)` is `undefined`. Sets `argumentIdentifierRegistry.set(20, 3)`. `nextUniqueIdentifier` becomes 4. Returns 3.
 *     `keyConstituents = [2, 3]`.
 *     `finalCacheKey` becomes "2-3".
 *     `primaryCacheStore.has("2-3")` is false.
 *     `fn('beta', 20)` executes, `functionOutcome = "beta::20"`.
 *     `primaryCacheStore.set("2-3", "beta::20")`.
 *     Returns "beta::20".
 *
 *   Call 3: `memoizedInvoker(10, 'alpha')` (Same arguments as Call 1)
 *     `inputArguments = [10, 'alpha']`.
 *     `obtainArgumentIdentifier(10)`: `argumentIdentifierRegistry.get(10)` is 0. Returns 0.
 *     `obtainArgumentIdentifier('alpha')`: `argumentIdentifierRegistry.get('alpha')` is 1. Returns 1.
 *     `keyConstituents = [0, 1]`.
 *     `finalCacheKey` becomes "0-1".
 *     `primaryCacheStore.has("0-1")` is true.
 *     `retrievedResult = primaryCacheStore.get("0-1")` which is "10::alpha".
 *     `fn` is NOT called again.
 *     Returns "10::alpha".
 * Time Complexity: O(A)
 * Space Complexity: O(C * K + U * S)
 */
function memoize(fn) {
  const primaryCacheStore = new Map();
  const argumentIdentifierRegistry = new Map();
  let nextUniqueIdentifier = 0;

  const obtainArgumentIdentifier = (valueToIdentify) => {
    let identifierFromRegistry =
      argumentIdentifierRegistry.get(valueToIdentify);
    return (
      identifierFromRegistry ??
      ((argumentIdentifierRegistry.set(valueToIdentify, nextUniqueIdentifier),
      nextUniqueIdentifier++),
      argumentIdentifierRegistry.get(valueToIdentify))
    );
  };

  const memoizedInvoker = (...inputArguments) => {
    const keyConstituents = inputArguments.map(obtainArgumentIdentifier);
    const finalCacheKey = keyConstituents.join("-");

    if (primaryCacheStore.has(finalCacheKey)) {
      const retrievedResult = primaryCacheStore.get(finalCacheKey);
      return retrievedResult;
    } else {
      const functionOutcome = fn(...inputArguments);
      primaryCacheStore.set(finalCacheKey, functionOutcome);
      return functionOutcome;
    }
  };

  return memoizedInvoker;
}
