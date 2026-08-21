/**
 * Rotated Digits
 * Intuition: A number is “good” if every digit is rotatable (0,1,2,5,6,8,9) and at least one digit actually changes (2,5,6,9). 3,4,7 are invalid.
 * Approach: 1. For `currentNumber` from 1 to n, call `checkGoodRotation`. 2. Peel digits with `% 10`: 3/4/7 → false; 2/5/6/9 set `hasDifferenceDigit`. 3. Return whether a changing digit appeared. Count successes in `goodNumbersCount`.
 * Dry Run: n = 10.
 *   - 1 invalid-good (only 0/1/8). 2 yes, 5 yes, 6 yes, 9 yes. 10: digits 1,0 no change. Return 4.
 * Time Complexity: O(n * log n)
 * Space Complexity: O(1)
 */
var rotatedDigits = function (n) {
  let goodNumbersCount = 0;

  for (let currentNumber = 1; currentNumber <= n; currentNumber++) {
    if (checkGoodRotation(currentNumber)) {
      goodNumbersCount++;
    }
  }

  return goodNumbersCount;

  function checkGoodRotation(originalNumber) {
    let hasDifferenceDigit = false;
    let temporaryNumber = originalNumber;

    while (temporaryNumber > 0) {
      let currentDigit = temporaryNumber % 10;

      if (currentDigit === 3 || currentDigit === 4 || currentDigit === 7) {
        return false;
      } else if (
        currentDigit === 2 ||
        currentDigit === 5 ||
        currentDigit === 6 ||
        currentDigit === 9
      ) {
        hasDifferenceDigit = true;
      }

      temporaryNumber = Math.floor(temporaryNumber / 10);
    }

    return hasDifferenceDigit;
  }
};
