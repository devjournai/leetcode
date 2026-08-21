/**
 * Armstrong Number
 * Intuition: An Armstrong number equals the sum of each digit raised to the number of digits.
 * Approach: 1. Count digits by dividing n by 10. 2. Sum digit^k for each digit. 3. Compare to the original n.
 * Dry Run: n = 153.
 *   - 3 digits. 1^3 + 5^3 + 3^3 = 1+125+27 = 153. True.
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
