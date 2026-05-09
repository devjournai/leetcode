/**
 * Longest Common Subsequence Between Sorted Arrays
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
        (elementFrequencyMap.get(numberValue) || 0) + 1,
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
    (firstValue, secondValue) => firstValue - secondValue,
  );

  return commonElementsResult;
};
