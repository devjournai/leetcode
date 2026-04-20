/**
 * Longest Harmonious Subsequence
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
var findLHS = function (nums) {
  const frequencyMap = new Map();

  for (const currentNumber of nums) {
    const valueCount = frequencyMap.get(currentNumber) || 0;
    frequencyMap.set(currentNumber, valueCount + 1);
  }

  let maxLengthFound = 0;

  for (const [mapNumber, numberOccurrences] of frequencyMap) {
    const nextNumber = mapNumber + 1;
    if (frequencyMap.has(nextNumber)) {
      const nextNumberOccurrences = frequencyMap.get(nextNumber);
      const currentSubsequenceLength =
        numberOccurrences + nextNumberOccurrences;
      if (currentSubsequenceLength > maxLengthFound) {
        maxLengthFound = currentSubsequenceLength;
      }
    }
  }

  return maxLengthFound;
};
