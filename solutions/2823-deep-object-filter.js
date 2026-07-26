/**
 * Deep Object Filter
 * Intuition: Recursively traverse the input structure, applying the filter function at the leaf level and pruning empty collections at higher levels.
 * Approach:
 *   1. Check if the input `obj` is an array. If so, iterate through its elements using a `for...of` loop. Recursively call `deepFilter` on each element. Collect all non-`undefined` results into a new array. If this new array is empty, return `undefined`; otherwise, return the array.
 *   2. Else, if `obj` is a plain object (not null and not an array), iterate through its properties using a `for...in` loop (ensuring `hasOwnProperty` to avoid prototype properties). Recursively call `deepFilter` on each property's value. Collect all non-`undefined` key-value pairs into a new object. If this new object has no valid properties, return `undefined`; otherwise, return the object.
 *   3. Else (for primitive values), apply the provided filter function `fn` to `obj`. If `fn(obj)` returns `true`, return `obj`; otherwise, return `undefined`.
 * Dry Run:
 *   obj = {a: 1, b: [2, {c: 3}], d: {e: 4}}, fn = (x) => x % 2 !== 0
 *
 *   1. deepFilter({a: 1, b: [2, {c: 3}], d: {e: 4}}, fn)
 *      - `obj` is an object. `resultObject` = {}, `hasValidContent` = false.
 *      - For property "a":
 *        - `deepFilter(1, fn)`: `obj` is primitive. `fn(1)` (1 % 2 !== 0) is true. Returns 1.
 *        - `resultObject["a"]` = 1. `hasValidContent` = true. (`resultObject` = {a: 1})
 *      - For property "b":
 *        - `deepFilter([2, {c: 3}], fn)`: `obj` is an array. `collectedElements` = [].
 *          - For element 2:
 *            - `deepFilter(2, fn)`: `obj` is primitive. `fn(2)` (2 % 2 !== 0) is false. Returns `undefined`.
 *          - For element {c: 3}:
 *            - `deepFilter({c: 3}, fn)`: `obj` is an object. `tempResultObject` = {}, `tempHasContent` = false.
 *              - For property "c":
 *                - `deepFilter(3, fn)`: `obj` is primitive. `fn(3)` (3 % 2 !== 0) is true. Returns 3.
 *                - `tempResultObject["c"]` = 3. `tempHasContent` = true. (`tempResultObject` = {c: 3})
 *              - Returns `{c: 3}` (since `tempHasContent` is true).
 *          - `collectedElements.push({c: 3})`. (`collectedElements` = [{c: 3}])
 *          - Returns `[{c: 3}]` (since `collectedElements.length` > 0).
 *        - `resultObject["b"]` = `[{c: 3}]`. `hasValidContent` = true. (`resultObject` = {a: 1, b: [{c: 3}]})
 *      - For property "d":
 *        - `deepFilter({e: 4}, fn)`: `obj` is an object. `intermediateResult` = {}, `intermediateContent` = false.
 *          - For property "e":
 *            - `deepFilter(4, fn)`: `obj` is primitive. `fn(4)` (4 % 2 !== 0) is false. Returns `undefined`.
 *          - Returns `undefined` (since `intermediateContent` is false).
 *      - Returns `{a: 1, b: [{c: 3}]}` (since `hasValidContent` is true).
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var deepFilter = function (obj, fn) {
  if (Array.isArray(obj)) {
    const collectedElements = [];
    for (const currentElement of obj) {
      const processedItem = deepFilter(currentElement, fn);
      if (processedItem !== undefined) {
        collectedElements.push(processedItem);
      }
    }
    return collectedElements.length > 0 ? collectedElements : undefined;
  }

  if (typeof obj === "object" && obj !== null) {
    const resultObject = {};
    let hasValidContent = false;
    for (const objectProperty in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, objectProperty)) {
        const filteredPropertyValue = deepFilter(obj[objectProperty], fn);
        if (filteredPropertyValue !== undefined) {
          resultObject[objectProperty] = filteredPropertyValue;
          hasValidContent = true;
        }
      }
    }
    return hasValidContent ? resultObject : undefined;
  }

  return fn(obj) ? obj : undefined;
};
