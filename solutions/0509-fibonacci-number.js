/**
 * Fibonacci Number
 * Intuition: F(n) is the rolling sum of the previous two terms. Two variables replace an array of all Fibonacci numbers.
 * Approach: 1. Return 0 or 1 for n=0/1. 2. Set `previousValue=0`, `currentValue=1`. 3. From 2 to n, `next = previous + current`, then shift the pair forward. 4. Return `currentValue`.
 * Dry Run: n = 4.
 *   - Start 0,1. i=2 → 1; i=3 → 2; i=4 → 3. Return 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var fib = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  let previousValue = 0;
  let currentValue = 1;
  let iterationCounter = 2;

  while (iterationCounter <= n) {
    let nextComputedValue = previousValue + currentValue;
    previousValue = currentValue;
    currentValue = nextComputedValue;
    iterationCounter++;
  }

  return currentValue;
};
