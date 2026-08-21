/**
 * Construct K Palindrome Strings
 * Intuition: Each palindrome needs at most one odd-count character. We can always split even leftovers, so we need k between the odd-count and the string length.
 * Approach: 1. If k > length, false. 2. Count letter frequencies and how many are odd. 3. Return true iff oddCount <= k <= length.
 * Dry Run: s = "annabelle", k = 2.
 *   - Frequencies leave one odd letter (b). 1 <= 2 <= 9. Return true.
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var canConstruct = function (s, k) {
  const stringLength = s.length;

  if (k > stringLength) {
    return false;
  }

  const charFrequencies = new Array(26).fill(0);
  const charCodeOffset = "a".charCodeAt(0);

  for (const charInput of s) {
    const characterIndex = charInput.charCodeAt(0) - charCodeOffset;
    charFrequencies[characterIndex]++;
  }

  let oddFrequencyCharacters = 0;
  for (const frequencyCount of charFrequencies) {
    if (frequencyCount % 2 !== 0) {
      oddFrequencyCharacters++;
    }
  }

  const possiblePalindromeCount = k;
  const minimumPalindromesNeeded = oddFrequencyCharacters;

  const canFormEnoughPalindromes =
    possiblePalindromeCount >= minimumPalindromesNeeded;
  const hasEnoughCharacters = possiblePalindromeCount <= stringLength;

  return canFormEnoughPalindromes && hasEnoughCharacters;
};
