/**
 * Is Object Empty
 * Intuition: An object or array is considered empty if it contains no enumerable own properties (key-value pairs) or elements, respectively. The absence of such entries indicates emptiness.
 * Approach: 1. Utilize `Object.entries()` to retrieve an array containing all [key, value] pairs of the given object or array's own enumerable string-keyed properties. 2. Check the `length` property of the resulting array. If this length is zero, the original object or array is empty. 3. Negate this length value (0 becomes true, non-zero becomes false) to return the boolean emptiness status.
 * Dry Run:
 *   Input: obj = {"product": "Laptop", "price": 1200}
 *     1. `Object.entries(obj)` returns `[["product", "Laptop"], ["price", 1200]]`.
 *     2. The `length` of this new array is `2`.
 *     3. `!2` evaluates to `false`. Result: `false` (correct, object is not empty).
 *
 *   Input: obj = {}
 *     1. `Object.entries(obj)` returns `[]`.
 *     2. The `length` of this new array is `0`.
 *     3. `!0` evaluates to `true`. Result: `true` (correct, object is empty).
 *
 *   Input: obj = [10, 20, 30]
 *     1. `Object.entries(obj)` returns `[["0", 10], ["1", 20], ["2", 30]]`.
 *     2. The `length` of this new array is `3`.
 *     3. `!3` evaluates to `false`. Result: `false` (correct, array is not empty).
 *
 *   Input: obj = []
 *     1. `Object.entries(obj)` returns `[]`.
 *     2. The `length` of this new array is `0`.
 *     3. `!0` evaluates to `true`. Result: `true` (correct, array is empty).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isEmpty = function (obj) {
  return !Object.entries(obj).length;
};
