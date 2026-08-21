/**
 * Range Addition
 * Intuition: A range add can be applied as +inc at the start index and −inc just after the end; a prefix-sum pass then materializes every cell’s net increment.
 * Approach: 1. Zero array of `length`. 2. For each [start, end, inc], add inc at start and subtract inc at end+1 if in bounds. 3. Prefix-sum from index 1 to the end.
 * Dry Run: length = 5, updates = [[1,3,2],[2,4,3]]. Diff [0,2,3,0,-2] then −3 at index 5 skipped; prefix → [0,2,5,5,3].
 * Time Complexity: O(length + updates.length)
 * Space Complexity: O(length)
 */
var getModifiedArray = function (length, updates) {
  const modifiedArrayElements = new Array(length).fill(0);

  for (const updateOperation of updates) {
    const startRangeIndex = updateOperation[0];
    const endRangeIndex = updateOperation[1];
    const incrementValue = updateOperation[2];

    modifiedArrayElements[startRangeIndex] += incrementValue;

    if (endRangeIndex + 1 < length) {
      modifiedArrayElements[endRangeIndex + 1] -= incrementValue;
    }
  }

  for (let currentPosition = 1; currentPosition < length; currentPosition++) {
    modifiedArrayElements[currentPosition] +=
      modifiedArrayElements[currentPosition - 1];
  }

  return modifiedArrayElements;
};
