/**
 * Palindrome Partitioning II
 * Intuition: Min cuts for prefix s[0..i) is 1 plus the min cuts of a shorter prefix that leaves a palindrome suffix. A boolean table of all palindromic substrings makes each suffix check O(1).
 * Approach: 1. Fill isPal[l][r] by length: singles true, pairs equal chars, longer if ends match and interior is palindrome. 2. minCuts[0] = -1. 3. For each prefix end, min over palindrome last-segments of minCuts[start]+1. Return minCuts[n].
 * Dry Run: s = "aab". Palindromes include a,a,b,aa. Prefix "aa" needs 0 cuts; "aab" takes "aa"|"b" → 1 cut.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var minCut = function (s) {
  const stringLength = s.length;

  const isSubsegmentPalindrome = new Array(stringLength)
    .fill(false)
    .map(() => new Array(stringLength).fill(false));

  for (let currentLength = 1; currentLength <= stringLength; currentLength++) {
    for (
      let startPosition = 0;
      startPosition <= stringLength - currentLength;
      startPosition++
    ) {
      const endPosition = startPosition + currentLength - 1;

      if (currentLength === 1) {
        isSubsegmentPalindrome[startPosition][endPosition] = true;
      } else if (currentLength === 2) {
        isSubsegmentPalindrome[startPosition][endPosition] =
          s[startPosition] === s[endPosition];
      } else {
        isSubsegmentPalindrome[startPosition][endPosition] =
          s[startPosition] === s[endPosition] &&
          isSubsegmentPalindrome[startPosition + 1][endPosition - 1];
      }
    }
  }

  const minimumCutsArray = new Array(stringLength + 1);
  minimumCutsArray[0] = -1;

  for (
    let currentPrefixEnd = 1;
    currentPrefixEnd <= stringLength;
    currentPrefixEnd++
  ) {
    let cutsForCurrentPrefix = stringLength;
    for (
      let lastPalindromeStart = 0;
      lastPalindromeStart < currentPrefixEnd;
      lastPalindromeStart++
    ) {
      if (isSubsegmentPalindrome[lastPalindromeStart][currentPrefixEnd - 1]) {
        cutsForCurrentPrefix = Math.min(
          cutsForCurrentPrefix,
          minimumCutsArray[lastPalindromeStart] + 1
        );
        cutsForCurrentPrefix = Math.min(
          cutsForCurrentPrefix,
          minimumCutsArray[lastPalindromeStart] + 1
        );
      }
    }
    minimumCutsArray[currentPrefixEnd] = cutsForCurrentPrefix;
  }

  return minimumCutsArray[stringLength];
};
