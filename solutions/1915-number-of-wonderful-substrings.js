/**
 * Number Of Wonderful Substrings
 * Time Complexity: O(word.length)
 * Space Complexity: O(1)
 */
var wonderfulSubstrings = function (word) {
  let totalWonderfulCount = 0;
  const parityOccurrenceMap = new Map([[0, 1]]);
  let currentPrefixMask = 0;

  for (const charIter of word) {
    const charCodeOffset = charIter.charCodeAt(0) - "a".charCodeAt(0);
    const bitShift = 1 << charCodeOffset;
    currentPrefixMask ^= bitShift;

    totalWonderfulCount += parityOccurrenceMap.get(currentPrefixMask) || 0;
    parityOccurrenceMap.set(
      currentPrefixMask,
      (parityOccurrenceMap.get(currentPrefixMask) || 0) + 1,
    );

    for (let loopIndex = 0; loopIndex < 10; loopIndex++) {
      const xorMask = currentPrefixMask ^ (1 << loopIndex);
      totalWonderfulCount += parityOccurrenceMap.get(xorMask) || 0;
    }
  }

  return totalWonderfulCount;
};
