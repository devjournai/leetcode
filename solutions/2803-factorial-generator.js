/**
 * Factorial Generator
 * Intuition: Factorial calculation involves successive multiplication, and a generator needs to yield these intermediate results. Handle the base case of 0! explicitly.
 * Approach: 1. Check if the input `n` is 0; if so, yield 1 and terminate. 2. Initialize a product accumulator to 1 and an iteration counter to 1. 3. Use a `while` loop to iterate from 1 up to `n` (inclusive). 4. In each iteration, multiply the product accumulator by the current iteration counter and yield the result. 5. Increment the iteration counter.
 * Dry Run: n = 2
 *   - n is not 0.
 *   - productAccumulator = 1
 *   - currentIteration = 1
 *   - while (1 <= 2) is true:
 *     - productAccumulator = 1 * 1 = 1
 *     - yield 1
 *     - currentIteration = 2
 *   - while (2 <= 2) is true:
 *     - productAccumulator = 1 * 2 = 2
 *     - yield 2
 *     - currentIteration = 3
 *   - while (3 <= 2) is false.
 *   - Generator finishes.
 *   - Output: 1, 2
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function* factorial(n) {
  if (n === 0) {
    yield 1;
    return;
  }

  let productAccumulator = 1;
  let currentIteration = 1;

  while (currentIteration <= n) {
    productAccumulator *= currentIteration;
    yield productAccumulator;
    currentIteration++;
  }
}
