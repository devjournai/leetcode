/**
  * Palindrome Number
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

  return originalVal === reversedNum || originalVal === Math.floor(reversedNum / 10);
};