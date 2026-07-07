/**
 * Array Reduce Transformation
 * Intuition: The problem asks to simulate the behavior of the `Array.prototype.reduce` method, which iteratively applies a function to each element of an array, accumulating a single result.
 * Approach: 1. Initialize an accumulator variable with the provided `init` value. 2. Use a `while` loop to iterate through the `nums` array from the first element to the last. 3. In each iteration, call the provided `fn` function with the current accumulator value and the current array element, updating the accumulator with the returned value. 4. After the loop completes, return the final accumulator value.
 * Dry Run:
 * nums = [1,2,3], fn = (accumulateVal, currentVal) => accumulateVal + currentVal, init = 0
 *
 * 1. Initialize `currentAccumulator` = `init` = `0`.
 * 2. Initialize `processingIndex` = `0`.
 *
 * While loop starts:
 * Iteration 1:
 *   `processingIndex` (0) < `nums.length` (3) is true.
 *   `elementValue` = `nums[0]` = `1`.
 *   `currentAccumulator` = `fn(currentAccumulator, elementValue)` = `fn(0, 1)` = `0 + 1` = `1`.
 *   `processingIndex` becomes `1`.
 *
 * Iteration 2:
 *   `processingIndex` (1) < `nums.length` (3) is true.
 *   `elementValue` = `nums[1]` = `2`.
 *   `currentAccumulator` = `fn(currentAccumulator, elementValue)` = `fn(1, 2)` = `1 + 2` = `3`.
 *   `processingIndex` becomes `2`.
 *
 * Iteration 3:
 *   `processingIndex` (2) < `nums.length` (3) is true.
 *   `elementValue` = `nums[2]` = `3`.
 *   `currentAccumulator` = `fn(currentAccumulator, elementValue)` = `fn(3, 3)` = `3 + 3` = `6`.
 *   `processingIndex` becomes `3`.
 *
 * Loop condition `processingIndex` (3) < `nums.length` (3) is false. Loop terminates.
 *
 * 3. Return `currentAccumulator` = `6`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var reduce = function (nums, fn, init) {
  let currentAccumulator = init;
  let processingIndex = 0;

  while (processingIndex < nums.length) {
    let elementValue = nums[processingIndex];
    currentAccumulator = fn(currentAccumulator, elementValue);
    processingIndex++;
  }

  return currentAccumulator;
};
