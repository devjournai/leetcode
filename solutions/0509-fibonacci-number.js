/**
 * Fibonacci Number
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
