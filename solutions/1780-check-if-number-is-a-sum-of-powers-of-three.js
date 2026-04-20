/**
 * Check If Number Is A Sum Of Powers Of Three
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var checkPowersOfThree = function (n) {
  for (
    let currentNumber = n;
    currentNumber > 0;
    currentNumber = Math.floor(currentNumber / 3)
  ) {
    let digitRemainder = currentNumber % 3;
    if (digitRemainder === 2) {
      return false;
    }
  }
  return true;
};
