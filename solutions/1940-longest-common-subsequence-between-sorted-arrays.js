/**
 * Longest Common Subsequence Between Sorted Arrays
 * Intuition: Because each array is strictly increasing, a value appears in every array iff its total frequency across arrays equals the number of arrays. Collect those values and sort them to restore order.
 * Approach: 1. Count occurrences of every number across all arrays. 2. Push keys whose count equals `arraysInput.length`. 3. Sort the result ascending and return it.
 * Dry Run: arrays = [[1,3,4], [1,4,7,9]].
 *   - freq: 1→2, 3→1, 4→2, 7→1, 9→1
 *   - keep 1 and 4 → [1,4]
 * Time Complexity: O(S + C log C)
 * Space Complexity: O(U)
 */
var longestCommonSubsequence = function (arraysInput) {
  const elementFrequencyMap = new Map();
  const totalArrayCount = arraysInput.length;

  for (let arrayIndex = 0; arrayIndex < totalArrayCount; arrayIndex++) {
    const currentArrayProcessing = arraysInput[arrayIndex];
    for (
      let elementPosition = 0;
      elementPosition < currentArrayProcessing.length;
      elementPosition++
    ) {
      const numberValue = currentArrayProcessing[elementPosition];
      elementFrequencyMap.set(
        numberValue,
        (elementFrequencyMap.get(numberValue) || 0) + 1
      );
    }
  }

  const commonElementsResult = [];

  for (const [keyItem, countOccurrence] of elementFrequencyMap) {
    if (countOccurrence === totalArrayCount) {
      commonElementsResult.push(keyItem);
    }
  }

  commonElementsResult.sort(
    (firstValue, secondValue) => firstValue - secondValue
  );

  return commonElementsResult;
};
