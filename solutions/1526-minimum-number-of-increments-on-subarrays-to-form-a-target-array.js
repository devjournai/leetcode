/**
 * Minimum Number Of Increments On Subarrays To Form A Target Array
 * Intuition: Each rise from target[i-1] to a taller target[i] needs extra range increments; falls are already covered.
 * Approach: 1. Start with target[0] ops. 2. For i>0 if target[i]>prev add the difference.
 * Dry Run: target = [1,2,3,2,1].
 *   - 1 + (2-1) + (3-2) = 3.
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
