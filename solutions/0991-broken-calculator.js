/**
 * Broken Calculator
 * Intuition: Work backward from `target`: even → divide by 2 (reverse of double); odd → add 1 (reverse of subtract 1). Then add `startValue - currentFocusValue` decrements.
 * Approach: 1. While `currentFocusValue > startValue`, if even divide else increment; count ops. 2. When ≤ start, remaining ops are `startValue - currentFocusValue`. 3. Return the sum.
 * Dry Run: startValue=2, target=3. 3 odd → 4; 4/2=2. Two ops. Remainder 0. Answer 2.
 * Time Complexity: O(log(target))
 * Space Complexity: O(1)
 */
var brokenCalc = function (startValue, target) {
  let operationCounter = 0;
  let currentFocusValue = target;

  while (currentFocusValue > startValue) {
    if (currentFocusValue % 2 === 0) {
      currentFocusValue = currentFocusValue / 2;
    } else {
      currentFocusValue = currentFocusValue + 1;
    }
    operationCounter = operationCounter + 1;
  }

  let finalRemainderOperations = startValue - currentFocusValue;
  let totalOperationResult = operationCounter + finalRemainderOperations;
  return totalOperationResult;
};
