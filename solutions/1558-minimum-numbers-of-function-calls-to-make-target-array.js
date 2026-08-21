/**
 * Minimum Numbers Of Function Calls To Make Target Array
 * Intuition: Build from 0: +1 is increment, *2 is global double. Increments sum popcounts; doubles equal the max bit-length-1 among numbers.
 * Approach: 1. For each num count odds (+1) and halves (doubles). 2. Sum increments + max doubles.
 * Dry Run: nums = [1,5].
 *   - Increments plus shared doubles total 5.
 * Time Complexity: O(N * log(M))
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  let totalIncrementOperations = 0;
  let maxDoubleOperations = 0;

  for (let currentNumber of nums) {
    let individualIncrementCount = 0;
    let individualDoubleCount = 0;
    let valueToProcess = currentNumber;

    while (valueToProcess > 0) {
      if (valueToProcess % 2 === 1) {
        individualIncrementCount++;
        valueToProcess--;
      } else {
        individualDoubleCount++;
        valueToProcess /= 2;
      }
    }
    totalIncrementOperations += individualIncrementCount;
    maxDoubleOperations = Math.max(maxDoubleOperations, individualDoubleCount);
  }

  return totalIncrementOperations + maxDoubleOperations;
};
