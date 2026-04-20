/**
 * Largest Unique Number
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
