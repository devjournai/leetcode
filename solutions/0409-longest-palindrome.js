/**
 * Longest Palindrome
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestPalindrome = function (s) {
  const characterCounts = new Map();

  for (const charIdentifier of s) {
    characterCounts.set(charIdentifier, (characterCounts.get(charIdentifier) || 0) + 1);
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