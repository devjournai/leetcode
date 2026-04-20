/**
 * Find The Longest Substring Containing Vowels In Even Counts
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findTheLongestSubstring = function (s) {
  const vowelBitPositions = new Map([
    ["a", 0],
    ["e", 1],
    ["i", 2],
    ["o", 3],
    ["u", 4],
  ]);
  const seenMaskIndices = new Map([[0, -1]]);
  let currentVowelParityMask = 0;
  let maxSubstringLength = 0;

  for (let characterIndex = 0; characterIndex < s.length; characterIndex++) {
    const currentChar = s[characterIndex];
    if (vowelBitPositions.has(currentChar)) {
      const bitIdentifier = vowelBitPositions.get(currentChar);
      currentVowelParityMask ^= 1 << bitIdentifier;
    }

    if (seenMaskIndices.has(currentVowelParityMask)) {
      const firstIndexForMask = seenMaskIndices.get(currentVowelParityMask);
      const calculatedLength = characterIndex - firstIndexForMask;
      maxSubstringLength = Math.max(maxSubstringLength, calculatedLength);
    } else {
      seenMaskIndices.set(currentVowelParityMask, characterIndex);
    }
  }

  return maxSubstringLength;
};
