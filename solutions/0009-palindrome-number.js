/**
 * Palindrome Number
 * Intuition: Negative numbers and numbers ending in 0 (except 0) cannot be palindromes. Reverse only the second half of the remaining digits until it is at least as large as the first half, then compare (dropping the middle digit when the length is odd).
 * Approach: 1. Return false if `val < 0` or (`val % 10 === 0` and `val !== 0`). 2. While `originalVal > reversedNum`, append `lastDigit` onto `reversedNum` and floor-divide `originalVal`. 3. Return true if the halves equal or if `originalVal === floor(reversedNum / 10)` (odd length).
 * Dry Run: val = 121.
 *   - originalVal=121, reversedNum=0 → 12 vs 1 → 1 vs 12. originalVal=1, floor(12/10)=1 → true.
 * Time Complexity: O(log10(x))
 * Space Complexity: O(1)
 */
var isPalindrome = function (val) {
  if (val < 0 || (val % 10 === 0 && val !== 0)) {
    return false;
  }

  let reversedNum = 0;
  let originalVal = val;

  while (originalVal > reversedNum) {
    let lastDigit = originalVal % 10;
    reversedNum = reversedNum * 10 + lastDigit;
    originalVal = Math.floor(originalVal / 10);
  }

  return (
    originalVal === reversedNum || originalVal === Math.floor(reversedNum / 10)
  );
};
