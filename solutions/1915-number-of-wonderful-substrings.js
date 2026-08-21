/**
 * Number Of Wonderful Substrings
 * Intuition: A substring is wonderful if at most one letter has odd count. Prefix XOR masks (10 bits) plus a frequency map count equal masks (all even) and masks differing by one bit (one odd).
 * Approach: 1. Start map {0:1}. 2. XOR each letter’s bit into `currentPrefixMask`. 3. Add map[mask] and map[mask^(1<<b)] for b=0..9, then increment map[mask].
 * Dry Run: word="aba". Wonderful: "a","b","a","aba" (not "ab"/"ba"). Return 4.
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
      (parityOccurrenceMap.get(currentPrefixMask) || 0) + 1
    );

    for (let loopIndex = 0; loopIndex < 10; loopIndex++) {
      const xorMask = currentPrefixMask ^ (1 << loopIndex);
      totalWonderfulCount += parityOccurrenceMap.get(xorMask) || 0;
    }
  }

  return totalWonderfulCount;
};
