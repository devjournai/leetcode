/**
 * Rotated Digits
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
