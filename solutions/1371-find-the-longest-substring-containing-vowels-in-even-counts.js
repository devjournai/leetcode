/**
 * Find The Longest Substring Containing Vowels In Even Counts
 * Intuition: Even/odd vowel counts are a 5-bit parity mask. The longest even-parity substring between two equal masks is the distance from the first time that mask appeared.
 * Approach: 1. Map a,e,i,o,u to bits 0–4. 2. XOR the mask as each vowel is seen. 3. Store the first index of each mask (0 at -1). 4. When a mask repeats, update max length as i - firstIndex.
 * Dry Run: s = "eleetminicoworoep".
 *   - Mask starts 0 at -1. After enough vowels the same mask reappears spanning the whole string. Max length 13.
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
