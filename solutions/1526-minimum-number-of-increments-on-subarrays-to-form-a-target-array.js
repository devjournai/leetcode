/**
 * Minimum Number Of Increments On Subarrays To Form A Target Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minNumberOperations = function (target) {
  let totalOperationsRequired = target[0];
  let arrayLength = target.length;

  for (
    let currentPosition = 1;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    let previousElementValue = target[currentPosition - 1];
    let currentElementValue = target[currentPosition];

    if (currentElementValue > previousElementValue) {
      let differenceAmount = currentElementValue - previousElementValue;
      totalOperationsRequired += differenceAmount;
    }
  }

  return totalOperationsRequired;
};
