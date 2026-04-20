/**
 * Broken Calculator
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
