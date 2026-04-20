/**
 * Construct K Palindrome Strings
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
