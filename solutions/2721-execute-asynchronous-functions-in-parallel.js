/**
 * Execute Asynchronous Functions In Parallel
 * Intuition: To replicate Promise.all without using it, we need a mechanism to coordinate multiple independent asynchronous operations. A single, overarching promise can track the state of all these operations, resolving only when all child promises succeed and rejecting immediately upon the first child promise failure.
 * Approach: 1. Create and return a new Promise that encapsulates the aggregation logic, using `resolveResult` and `rejectError` callbacks. 2. Determine the `totalPromises` from the input array length. 3. Handle the edge case where `totalPromises` is zero by immediately calling `resolveResult([])`. 4. Initialize an array `resolvedValues` of the appropriate size to store results in their original order. 5. Initialize `completedCount` to zero to track successful asynchronous operations. 6. Iterate through the `functions` array using a traditional `for` loop. 7. For each function at `currentIndex`, invoke it to obtain an individual promise. 8. Attach a `.then()` handler to this individual promise to store its `currentValue` in `resolvedValues` at `currentIndex`, increment `completedCount`, and then check if `completedCount` equals `totalPromises`. If so, call `resolveResult(resolvedValues)`. 9. Attach a `.catch()` handler to this individual promise to immediately call `rejectError(rejectionReason)` upon any failure, fulfilling the "first rejection" requirement.
 * Dry Run:
 * functions = [
 *   () => new Promise(resolveOne => setTimeout(() => resolveOne(100), 50)),
 *   () => new Promise(resolveTwo => setTimeout(() => resolveTwo(200), 20))
 * ]
 * 1. `promiseAll` is invoked. A new Promise (`mainPromise`) is constructed and returned.
 * 2. Inside the `mainPromise` constructor:
 *    - `totalPromises` is 2.
 *    - `totalPromises` is not 0, so the early exit is skipped.
 *    - `resolvedValues` is initialized as `new Array(2)`, effectively `[undefined, undefined]`.
 *    - `completedCount` is initialized to 0.
 * 3. The `for` loop commences:
 *    - `currentIndex = 0`:
 *      - `currentFunction` refers to `functions[0]`.
 *      - `currentFunction()` is called, yielding `promiseA` (which resolves `100` after 50ms).
 *      - `.then()` and `.catch()` handlers are attached to `promiseA`.
 *    - `currentIndex = 1`:
 *      - `currentFunction` refers to `functions[1]`.
 *      - `currentFunction()` is called, yielding `promiseB` (which resolves `200` after 20ms).
 *      - `.then()` and `.catch()` handlers are attached to `promiseB`.
 * 4. Asynchronous execution proceeds:
 *    - At approximately `t = 20ms`: `promiseB` resolves with `200`.
 *      - Its `.then()` callback executes:
 *        - `resolvedValues[1]` becomes `200`. `resolvedValues` is now `[undefined, 200]`.
 *        - `completedCount` increments to 1.
 *        - `completedCount` (1) is not equal to `totalPromises` (2), so `resolveResult` is not called.
 *    - At approximately `t = 50ms`: `promiseA` resolves with `100`.
 *      - Its `.then()` callback executes:
 *        - `resolvedValues[0]` becomes `100`. `resolvedValues` is now `[100, 200]`.
 *        - `completedCount` increments to 2.
 *        - `completedCount` (2) is equal to `totalPromises` (2).
 *        - `resolveResult(resolvedValues)` is called, causing `mainPromise` to resolve with `[100, 200]`.
 * 5. The `mainPromise` resolves with the array `[100, 200]`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var promiseAll = function (functions) {
  return new Promise((resolveResult, rejectError) => {
    const totalPromises = functions.length;
    if (totalPromises === 0) {
      resolveResult([]);
      return;
    }

    const resolvedValues = new Array(totalPromises);
    let completedCount = 0;

    for (let currentIndex = 0; currentIndex < totalPromises; currentIndex++) {
      const currentFunction = functions[currentIndex];
      currentFunction()
        .then((currentValue) => {
          resolvedValues[currentIndex] = currentValue;
          completedCount++;
          if (completedCount === totalPromises) {
            resolveResult(resolvedValues);
          }
        })
        .catch((rejectionReason) => {
          rejectError(rejectionReason);
        });
    }
  });
};
