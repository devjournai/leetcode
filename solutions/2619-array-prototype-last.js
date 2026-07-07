/**
 * Array Prototype Last
 * Intuition: The last element of an array is consistently found at the index equal to its length minus one. For an empty array, where length is zero, this index is invalid, requiring a special return value of -1.
 * Approach: 1. Leverage the `this` keyword to access the current array instance on which the `last()` method is invoked. 2. Determine the array's size by checking its `length` property. 3. Implement a conditional check: if `length` is 0 (indicating an empty array), immediately return -1. 4. Otherwise, if the array contains elements, return the element located at the index `length - 1`.
 * Dry Run:
 *   Sample Input 1: `[10, 20, 30].last()`
 *   - `this` refers to `[10, 20, 30]`.
 *   - `this.length` is `3`.
 *   - `!this.length` evaluates to `!3`, which is `false`.
 *   - The ternary operator evaluates the false branch: `this[this.length - 1]`.
 *   - This resolves to `this[3 - 1]`, which is `this[2]`.
 *   - `this[2]` is `30`.
 *   - Output: `30`.
 *
 *   Sample Input 2: `[].last()`
 *   - `this` refers to `[]`.
 *   - `this.length` is `0`.
 *   - `!this.length` evaluates to `!0`, which is `true`.
 *   - The ternary operator evaluates the true branch: `-1`.
 *   - Output: `-1`.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
Array.prototype.last = function () {
  return !this.length ? -1 : this[this.length - 1];
};
