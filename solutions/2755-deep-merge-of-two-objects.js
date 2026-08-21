/**
 * Deep Merge Of Two Objects
 * Intuition: The merging process is inherently recursive. If the second object (`obj2`) is a primitive or `null`, it always overrides `obj1`. If `obj1` is primitive or `null` but `obj2` is a complex type, `obj2` also takes precedence. When both are complex (objects or arrays) but of different types, `obj2` still wins. Only when both are complex and of the same type do we proceed with a deep merge by traversing their internal structures.
 * Approach:
 * 1.  Handle immediate override conditions: If `obj2` is primitive or `null`, return `obj2`. If `obj1` is primitive or `null` (and `obj2` is complex), return `obj2`. If `obj1` and `obj2` are both complex but of differing types (one an array, one a plain object), return `obj2`.
 * 2.  If both `obj1` and `obj2` are arrays: Create a new array. Use a `while` loop to iterate from index 0 up to the maximum length of both arrays. For each index, if `obj2` has an element, recursively call `deepMerge` on `obj1`'s element and `obj2`'s element. Otherwise (if `obj2` is shorter), take `obj1`'s element directly.
 * 3.  If both `obj1` and `obj2` are plain objects: Create a new object. First, iterate through all properties of `obj1` using a `for...in` loop and copy them to the new object (this preserves `obj1`'s unique keys). Second, iterate through all properties of `obj2` using another `for...in` loop. For each property, recursively call `deepMerge` on the corresponding value from the new object (which is either `obj1`'s value or `undefined` if the key was not in `obj1`) and `obj2`'s value, then assign the result back to the new object.
 * Dry Run:
 *   obj1 = {a: 1, b: {c: 2}}, obj2 = {b: {d: 3}, e: 4}
 *   1. Call `deepMerge({a:1, b:{c:2}}, {b:{d:3}, e:4})`
 *      - `isObjectTwoPrimitiveOrNull` is `false`.
 *      - `isObjectOnePrimitiveOrNull` is `false`.
 *      - `isObjectOneArray !== isObjectTwoArray` is `false` (both are objects).
 *      - `isObjectOneArray` is `false`. Enters plain objects merge block.
 *      - `mergedFinalResult = {}`.
 *      - **First `for...in` loop (over `obj1`):**
 *        - `currentPropertyKey = 'a'`: `mergedFinalResult.a = 1`. `mergedFinalResult` is `{a:1}`.
 *        - `currentPropertyKey = 'b'`: `mergedFinalResult.b = {c:2}`. `mergedFinalResult` is `{a:1, b:{c:2}}`.
 *      - **Second `for...in` loop (over `obj2`):**
 *        - `otherPropertyKey = 'b'`:
 *          - `propertyFromObj1 = mergedFinalResult.b` (`{c:2}`).
 *          - `propertyFromObj2 = obj2.b` (`{d:3}`).
 *          - `mergedFinalResult.b = deepMerge({c:2}, {d:3})` (Recursive Call)
 *            - **Inside recursive call `deepMerge({c:2}, {d:3})`:**
 *              - Enters plain objects merge block. `innerResult = {}`.
 *              - **Inner first `for...in` loop (over `{c:2}`):** `innerResult.c = 2`. `innerResult` is `{c:2}`.
 *              - **Inner second `for...in` loop (over `{d:3}`):**
 *                - `innerKey = 'd'`:
 *                  - `innerProp1 = innerResult.d` (`undefined`).
 *                  - `innerProp2 = {d:3}.d` (`3`).
 *                  - `innerResult.d = deepMerge(undefined, 3)` (Recursive Call)
 *                    - **Inside recursive call `deepMerge(undefined, 3)`:**
 *                      - `isObjectTwoPrimitiveOrNull` (`false`, `3` is not primitive for this check, but a `number`).
 *                      - `isObjectOnePrimitiveOrNull` (`true`, `undefined` is primitive). Returns `obj2` (`3`).
 *                    - End recursive call. Returns `3`.
 *                  - `innerResult.d = 3`. `innerResult` is `{c:2, d:3}`.
 *              - End inner second `for...in` loop.
 *            - End recursive call. Returns `{c:2, d:3}`.
 *          - `mergedFinalResult.b = {c:2, d:3}`. `mergedFinalResult` is `{a:1, b:{c:2, d:3}}`.
 *        - `otherPropertyKey = 'e'`:
 *          - `propertyFromObj1 = mergedFinalResult.e` (`undefined`).
 *          - `propertyFromObj2 = obj2.e` (`4`).
 *          - `mergedFinalResult.e = deepMerge(undefined, 4)` (Recursive Call)
 *            - **Inside recursive call `deepMerge(undefined, 4)`:**
 *              - `isObjectTwoPrimitiveOrNull` (`false`).
 *              - `isObjectOnePrimitiveOrNull` (`true`). Returns `obj2` (`4`).
 *            - End recursive call. Returns `4`.
 *          - `mergedFinalResult.e = 4`. `mergedFinalResult` is `{a:1, b:{c:2, d:3}, e:4}`.
 *      - End second `for...in` loop.
 *      - Returns `mergedFinalResult` (`{a:1, b:{c:2, d:3}, e:4}`).
 * Final Result: `{a:1, b:{c:2, d:3}, e:4}`.
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */
var deepMerge = function (obj1, obj2) {
  const isObjectOnePrimitiveOrNull = typeof obj1 !== "object" || obj1 === null;
  const isObjectTwoPrimitiveOrNull = typeof obj2 !== "object" || obj2 === null;
  const isObjectOneArray = Array.isArray(obj1);
  const isObjectTwoArray = Array.isArray(obj2);

  if (isObjectTwoPrimitiveOrNull) {
    return obj2;
  }

  if (isObjectOnePrimitiveOrNull) {
    return obj2;
  }

  if (isObjectOneArray !== isObjectTwoArray) {
    return obj2;
  }

  if (isObjectOneArray) {
    const maxElementCount = Math.max(obj1.length, obj2.length);
    const mergedCollection = [];

    let currentIndex = 0;
    while (currentIndex < maxElementCount) {
      const valueFromObjectOne = obj1[currentIndex];
      const valueFromObjectTwo = obj2[currentIndex];

      if (currentIndex < obj2.length) {
        mergedCollection[currentIndex] = deepMerge(
          valueFromObjectOne,
          valueFromObjectTwo
        );
      } else {
        mergedCollection[currentIndex] = valueFromObjectOne;
      }
      currentIndex++;
    }
    return mergedCollection;
  } else {
    const mergedFinalResult = {};

    for (const currentPropertyKey in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, currentPropertyKey)) {
        mergedFinalResult[currentPropertyKey] = obj1[currentPropertyKey];
      }
    }

    for (const otherPropertyKey in obj2) {
      if (Object.prototype.hasOwnProperty.call(obj2, otherPropertyKey)) {
        const propertyFromObj1 = mergedFinalResult[otherPropertyKey];
        const propertyFromObj2 = obj2[otherPropertyKey];
        mergedFinalResult[otherPropertyKey] = deepMerge(
          propertyFromObj1,
          propertyFromObj2
        );
      }
    }
    return mergedFinalResult;
  }
};
