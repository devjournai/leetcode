/**
 * Array Prototype Foreach
 * Intuition: The fundamental concept of `forEach` is to perform a specified action for every item in an array, ensuring the provided function receives the correct `this` context and element details.
 * Approach: 1. Initialize an index tracking variable to zero. 2. Use a `while` loop to iterate through the array, continuing as long as the index is less than the array's length. 3. Inside the loop, execute the `callback` function, explicitly binding its `this` context using `Function.prototype.call` to the `context` parameter and passing the current element, its index, and the array itself as arguments. 4. Increment the index after each iteration.
 * Dry Run: Input: `myArr = [5, 10, 15]`, `processFn = function(item, idx, arrRef) { console.log(this.tag + item + " @ " + idx); }`, `scopeObj = { tag: "Number: " }`
 *
 * 1. `Array.prototype.forEach` is invoked on `myArr`. `callback` is `processFn`, `context` is `scopeObj`.
 * 2. `elementIndex` is set to `0`.
 *
 * 3. Loop 1:
 *    - `elementIndex` (`0`) < `this.length` (`3`) is `true`.
 *    - `currentValue` becomes `this[0]`, which is `5`.
 *    - `processFn.call(scopeObj, 5, 0, [5, 10, 15])` is executed.
 *      - Inside `processFn`, `this` refers to `scopeObj`.
 *      - `console.log("Number: " + 5 + " @ " + 0);` is called. (Output: "Number: 5 @ 0")
 *    - `elementIndex` increments to `1`.
 *
 * 4. Loop 2:
 *    - `elementIndex` (`1`) < `this.length` (`3`) is `true`.
 *    - `currentValue` becomes `this[1]`, which is `10`.
 *    - `processFn.call(scopeObj, 10, 1, [5, 10, 15])` is executed.
 *      - `console.log("Number: " + 10 + " @ " + 1);` is called. (Output: "Number: 10 @ 1")
 *    - `elementIndex` increments to `2`.
 *
 * 5. Loop 3:
 *    - `elementIndex` (`2`) < `this.length` (`3`) is `true`.
 *    - `currentValue` becomes `this[2]`, which is `15`.
 *    - `processFn.call(scopeObj, 15, 2, [5, 10, 15])` is executed.
 *      - `console.log("Number: " + 15 + " @ " + 2);` is called. (Output: "Number: 15 @ 2")
 *    - `elementIndex` increments to `3`.
 *
 * 6. Loop termination:
 *    - `elementIndex` (`3`) < `this.length` (`3`) is `false`. The loop finishes.
 *
 * 7. The `forEach` method returns `undefined` (implicitly).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
Array.prototype.forEach = function (callbackFunction, executionContext) {
  let elementIndex = 0;
  while (elementIndex < this.length) {
    const currentValue = this[elementIndex];
    callbackFunction.call(executionContext, currentValue, elementIndex, this);
    elementIndex++;
  }
};
