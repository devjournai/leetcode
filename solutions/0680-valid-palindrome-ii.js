/**
 * Valid Palindrome II
 * Intuition: A palindrome after at most one deletion means two pointers can skip at most one mismatch: try deleting the left or the right char and check the rest is a palindrome.
 * Approach: 1. Two pointers `outerLeft`/`outerRight`. 2. On mismatch, return `isPalindromeHelper(s, outerLeft+1, outerRight) || isPalindromeHelper(s, outerLeft, outerRight-1)`. 3. Helper walks inward and requires all pairs equal. 4. No mismatch → true.
 * Dry Run: s="abca". (0,3) a==a; then (1,2) b≠c. helper(2,2) is a single char → true. Return true.
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
