/**
 * Valid Palindrome II
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var validPalindrome = function (s) {
  const stringLength = s.length;
  for (
    let outerLeft = 0, outerRight = stringLength - 1;
    outerLeft < outerRight;
    outerLeft++, outerRight--
  ) {
    if (s[outerLeft] !== s[outerRight]) {
      return (
        isPalindromeHelper(s, outerLeft + 1, outerRight) ||
        isPalindromeHelper(s, outerLeft, outerRight - 1)
      );
    }
  }

  return true;
};

function isPalindromeHelper(targetString, startComparison, endComparison) {
  let innerLeft = startComparison;
  let innerRight = endComparison;

  while (innerLeft < innerRight) {
    if (targetString[innerLeft] !== targetString[innerRight]) {
      return false;
    }
    innerLeft++;
    innerRight--;
  }

  return true;
}
