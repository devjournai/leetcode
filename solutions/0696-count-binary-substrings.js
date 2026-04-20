/**
 * Count Binary Substrings
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countBinarySubstrings = function (s) {
  let firstPointer = 0;
  const stringLength = s.length;
  const groupBlockLengths = [];

  while (firstPointer < stringLength) {
    const currentCharacterValue = s[firstPointer];
    let currentBlockSize = 0;
    let secondPointer = firstPointer;

    while (
      secondPointer < stringLength &&
      s[secondPointer] === currentCharacterValue
    ) {
      currentBlockSize++;
      secondPointer++;
    }
    groupBlockLengths.push(currentBlockSize);
    firstPointer = secondPointer;
  }

  let finalCount = 0;
  const numGroups = groupBlockLengths.length;
  let groupIndex = 0;

  while (groupIndex < numGroups - 1) {
    const lengthOne = groupBlockLengths[groupIndex];
    const lengthTwo = groupBlockLengths[groupIndex + 1];
    finalCount += Math.min(lengthOne, lengthTwo);
    groupIndex++;
  }

  return finalCount;
};
