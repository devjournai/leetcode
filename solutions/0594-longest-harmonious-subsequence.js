/**
 * Longest Harmonious Subsequence
 * Intuition: A harmonious subsequence uses only values x and x+1. Count frequencies, then for each key that has `key+1`, the candidate length is the sum of those two counts; take the max.
 * Approach: 1. Fill `frequencyMap` by incrementing each `currentNumber`. 2. For each `[mapNumber, numberOccurrences]`, if `frequencyMap.has(mapNumber+1)`, compare `numberOccurrences + nextNumberOccurrences` with `maxLengthFound`. 3. Return `maxLengthFound` (0 if no pair exists).
 * Dry Run: nums = [1,3,2,2,5,2,3,7].
 *   - Counts: 1:1, 2:3, 3:2, 5:1, 7:1. 1+2→4, 2+3→5. Max 5.
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
