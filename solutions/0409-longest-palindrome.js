/**
 * Longest Palindrome
 * Intuition: A palindrome can use an even count of every character plus at most one leftover odd character in the center. Pair off `floor(freq/2)*2` from each count.
 * Approach: 1. Count characters in a Map. 2. Add even portions of each frequency; set `singleCharacterAvailable` if any count is odd. 3. Add 1 if an odd leftover exists. 4. Return `finalPalindromeLength`.
 * Dry Run: s = "abccccdd".
 *   - a1 b1 c4 d2 → 0+0+4+2 = 6, odd leftover → 7.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestPalindrome = function (s) {
  const characterCounts = new Map();

  for (const charIdentifier of s) {
    characterCounts.set(
      charIdentifier,
      (characterCounts.get(charIdentifier) || 0) + 1
    );
  }

  let finalPalindromeLength = 0;
  let singleCharacterAvailable = false;

  for (const currentFrequency of characterCounts.values()) {
    finalPalindromeLength += Math.floor(currentFrequency / 2) * 2;
    if (currentFrequency % 2 === 1) {
      singleCharacterAvailable = true;
    }
  }

  if (singleCharacterAvailable) {
    finalPalindromeLength += 1;
  }

  return finalPalindromeLength;
};
