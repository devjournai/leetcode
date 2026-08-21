/**
 * Palindromic Substrings
 * Intuition: A substring s[i..j] is palindromic iff endpoints match and the inner s[i+1..j-1] is palindromic. DP by increasing length counts every true cell.
 * Approach: 1. Mark all length-1 cells true. 2. Mark length-2 pairs with equal chars. 3. For `substringLength` from 3 to n, if s[start]==s[end] and `isPalindrome[start+1][end-1]`, mark and increment `totalPalindromes`.
 * Dry Run: s = "aaa".
 *   - 3 singles. Two "aa" pairs. Length 3: s[0]==s[2] and inner "a" → +1. Return 6.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var countSubstrings = function (s) {
  let totalPalindromes = 0;
  const stringSize = s.length;

  if (stringSize === 0) {
    return 0;
  }

  const isPalindrome = Array(stringSize)
    .fill(false)
    .map(() => Array(stringSize).fill(false));

  for (let currentSingle = 0; currentSingle < stringSize; currentSingle++) {
    isPalindrome[currentSingle][currentSingle] = true;
    totalPalindromes++;
  }

  for (let currentPair = 0; currentPair < stringSize - 1; currentPair++) {
    if (s[currentPair] === s[currentPair + 1]) {
      isPalindrome[currentPair][currentPair + 1] = true;
      totalPalindromes++;
    }
  }

  for (
    let substringLength = 3;
    substringLength <= stringSize;
    substringLength++
  ) {
    for (
      let startIndex = 0;
      startIndex <= stringSize - substringLength;
      startIndex++
    ) {
      const endIndex = startIndex + substringLength - 1;
      if (
        s[startIndex] === s[endIndex] &&
        isPalindrome[startIndex + 1][endIndex - 1]
      ) {
        isPalindrome[startIndex][endIndex] = true;
        totalPalindromes++;
      }
    }
  }

  return totalPalindromes;
};
