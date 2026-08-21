/**
 * Count Binary Substrings
 * Intuition: Groups of identical bits sit side by side. Between two adjacent groups you can form min(len1,len2) substrings of equal 0s and 1s.
 * Approach: 1. Scan `s` with two pointers, push each run length into `groupBlockLengths`. 2. For consecutive groups add `Math.min(lengthOne, lengthTwo)` to `finalCount`.
 * Dry Run: s="00110011". Groups [2,2,2,2]. min pairs 2+2+2=6.
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
