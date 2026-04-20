/**
 * Minimum Numbers Of Function Calls To Make Target Array
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
