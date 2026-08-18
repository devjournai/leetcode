/**
 * Minimum Length Of Anagram Concatenation
 * Intuition: The shortest repeating anagram block length must divide n. Check divisors from small to large: every block of that length must have the same letter counts as the first block.
 * Approach: 1. Enumerate divisors of n. 2. For each candidate length, compare character counts of every block to the first. 3. Return the first (smallest) length that works.
 * Dry Run:
 *   s = "abba" lengths 1 no, 2: "ab" vs "ba" same counts. Return 2.
 * Time Complexity: O(N * d(N))
 * Space Complexity: O(1)
 */
var minAnagramLength = function (s) {
  const stringLength = s.length;
  const countsMatch = (blockLength) => {
    const targetCounts = new Array(26).fill(0);
    for (let index = 0; index < blockLength; index++) {
      targetCounts[s.charCodeAt(index) - 97]++;
    }
    for (
      let startIndex = blockLength;
      startIndex < stringLength;
      startIndex += blockLength
    ) {
      const blockCounts = new Array(26).fill(0);
      for (let offset = 0; offset < blockLength; offset++) {
        blockCounts[s.charCodeAt(startIndex + offset) - 97]++;
      }
      for (let letterIndex = 0; letterIndex < 26; letterIndex++) {
        if (blockCounts[letterIndex] !== targetCounts[letterIndex]) {
          return false;
        }
      }
    }
    return true;
  };

  for (let blockLength = 1; blockLength <= stringLength; blockLength++) {
    if (stringLength % blockLength === 0 && countsMatch(blockLength)) {
      return blockLength;
    }
  }
  return stringLength;
};
