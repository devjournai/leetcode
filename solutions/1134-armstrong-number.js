/**
 * Armstrong Number
 * Time Complexity: O(log(n))
 * Space Complexity: O(1)
 */
var isArmstrong = function (n) {
  let originalValue = n;
  let numberToCountDigits = n;
  let digitCount = 0;

  while (numberToCountDigits > 0) {
    numberToCountDigits = Math.floor(numberToCountDigits / 10);
    digitCount++;
  }

  let numberToProcessDigits = originalValue;
  let calculatedSum = 0;

  while (numberToProcessDigits > 0) {
    let currentDigit = numberToProcessDigits % 10;
    let digitPower = Math.pow(currentDigit, digitCount);
    calculatedSum += digitPower;
    numberToProcessDigits = Math.floor(numberToProcessDigits / 10);
  }

  return calculatedSum === originalValue;
};
