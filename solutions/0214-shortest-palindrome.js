/**
 * Shortest Palindrome
 * Intuition: Characters we must prepend are the reverse of the suffix after the longest palindromic prefix. That prefix length is the largest L where s[0..L) equals the corresponding suffix of reverse(s).
 * Approach: 1. If s is empty, return "". 2. Build invertedText. 3. Recursively try L = n, n-1, ... until s.slice(0,L) equals inverted.slice(n-L). 4. Prepend inverted.slice(0, n-L) to s.
 * Dry Run: s = "aacecaaa", inverted = "aaacecaa".
 *   - L=8: full strings differ. L=7: "aacecaa" === inverted.slice(1) → match.
 *   - Prepend inverted.slice(0,1) = "a" → "aaacecaaa".
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var shortestPalindrome = function (s) {
  const initialText = s;
  const initialTextLength = initialText.length;

  if (initialTextLength === 0) {
    return "";
  }

  const invertedText = initialText.split("").reverse().join("");

  const calculateLongestPalindromicPrefixLength = (currentSegmentLength) => {
    if (currentSegmentLength === 0) {
      return 0;
    }

    const segmentFromOriginal = initialText.slice(0, currentSegmentLength);
    const segmentFromInverted = invertedText.slice(
      initialTextLength - currentSegmentLength
    );

    if (segmentFromOriginal === segmentFromInverted) {
      return currentSegmentLength;
    } else {
      return calculateLongestPalindromicPrefixLength(currentSegmentLength - 1);
    }
  };

  const longestMatchingPrefixLength =
    calculateLongestPalindromicPrefixLength(initialTextLength);

  const charactersToPrepend = invertedText.slice(
    0,
    initialTextLength - longestMatchingPrefixLength
  );

  return charactersToPrepend + initialText;
};
