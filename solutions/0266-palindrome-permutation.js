/**
 * Palindrome Permutation
 * Intuition: A permutation is a palindrome iff at most one character has odd count. A set of currently-odd characters toggles on each occurrence.
 * Approach: 1. Empty set. 2. For each char, delete if present else add. 3. Return whether the set size is ≤ 1.
 * Dry Run: s = "aab".
 *   - a on, a off, b on. Size 1 → true. "abc" ends with size 3 → false.
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
