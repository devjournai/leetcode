/**
 * Nested Array Generator
 * Intuition: A multi-dimensional array can be traversed using recursion, yielding individual integers and delegating traversal for nested arrays.
 * Approach: 1. Define a generator function that iterates over the input array. 2. For each element, check if it's an array. 3. If it's an integer, yield the integer. 4. If it's another array, recursively call the generator on that nested array using `yield*` to delegate the generation.
 * Dry Run:
 * input = [1, [2, 3], 4]
 * 1. inorderTraversal([1, [2, 3], 4]) is called.
 * 2. Loop starts for elementValue in [1, [2, 3], 4]:
 *    a. elementValue = 1. Array.isArray(1) is false. Yield 1. Output: 1
 *    b. elementValue = [2, 3]. Array.isArray([2, 3]) is true.
 *       Delegate to inorderTraversal([2, 3]):
 *       i. Loop starts for innerElement in [2, 3]:
 *          - innerElement = 2. Array.isArray(2) is false. Yield 2. Output: 1, 2
 *          - innerElement = 3. Array.isArray(3) is false. Yield 3. Output: 1, 2, 3
 *       ii. inorderTraversal([2, 3]) finishes.
 *    c. elementValue = 4. Array.isArray(4) is false. Yield 4. Output: 1, 2, 3, 4
 * 3. inorderTraversal([1, [2, 3], 4]) finishes.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var inorderTraversal = function* (inputArray) {
  for (const currentElement of inputArray) {
    if (!Array.isArray(currentElement)) {
      yield currentElement;
    } else {
      yield* inorderTraversal(currentElement);
    }
  }
};
