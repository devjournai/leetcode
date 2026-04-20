/**
 * Palindromic Substrings
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
