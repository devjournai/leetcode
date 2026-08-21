/**
 * Largest Unique Number
 * Intuition: A unique number appears once. Count frequencies, then take the maximum value whose count is 1, or -1 if none.
 * Approach: 1. Count each value in a map. 2. Scan entries and track the max key with frequency 1.
 * Dry Run: nums = [5,7,3,9,4,9,8,3,1].
 *   - Unique: 5,7,4,8,1. Max is 8.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var largestUniqueNumber = function (nums) {
  const occurrenceMap = new Map();

  nums.forEach(function (currentValue) {
    const existingCount = occurrenceMap.get(currentValue) || 0;
    occurrenceMap.set(currentValue, existingCount + 1);
  });

  let biggestUnique = -1;

  const entryList = Array.from(occurrenceMap.entries());

  for (
    let indexPosition = 0;
    indexPosition < entryList.length;
    indexPosition++
  ) {
    const singleEntry = entryList[indexPosition];
    const storedValue = singleEntry[0];
    const storedFrequency = singleEntry[1];

    if (storedFrequency === 1) {
      biggestUnique = Math.max(biggestUnique, storedValue);
    }
  }

  return biggestUnique;
};
