/**
 * Palindrome Permutation
 * Time Complexity: O(N)
 * Space Complexity: O(k)
 */
var canPermutePalindrome = function (s) {
  const charFrequencyTracker = new Set();

  for (const currentCharacter of s) {
    if (charFrequencyTracker.has(currentCharacter)) {
      charFrequencyTracker.delete(currentCharacter);
    } else {
      charFrequencyTracker.add(currentCharacter);
    }
  }

  return charFrequencyTracker.size <= 1;
};
