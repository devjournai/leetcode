/**
 * Return Length Of Arguments Passed
 * Intuition: To determine the total number of arguments provided, we can systematically count each one.
 * Approach: 1. Initialize a counter variable, say `totalArguments`, to zero. 2. Iterate through each element in the `parameters` array, which contains all the passed arguments. 3. For every element encountered during iteration, increment the `totalArguments` counter. 4. After iterating through all elements, return the final value of `totalArguments`.
 * Dry Run: argumentsLength(5, "hello", true)
 *   1. The `parameters` array is initialized as `[5, "hello", true]`.
 *   2. A variable `totalArguments` is set to `0`.
 *   3. The loop begins iterating over `parameters`:
 *      - First element `5`: `totalArguments` becomes `1`.
 *      - Second element `"hello"`: `totalArguments` becomes `2`.
 *      - Third element `true`: `totalArguments` becomes `3`.
 *   4. The loop finishes.
 *   5. The function returns `3`.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var argumentsLength = function (...parameters) {
  let totalArguments = 0;
  for (let currentParameter of parameters) {
    totalArguments++;
  }
  return totalArguments;
};
