/**
 * Nth Digit
 * Intuition: Digits are grouped by length: 9 one-digit numbers, 90 two-digit, etc. Subtract whole groups from `n` until the remaining offset sits inside one length-`digitLength` block.
 * Approach: 1. While `n` exceeds `digitLength * numbersCount`, subtract that, bump length, multiply count and `baseNumber` by 10. 2. `targetNumber = baseNumber + floor((n-1)/digitLength)`. 3. Return that number’s digit at `(n-1) % digitLength`.
 * Dry Run: n = 11.
 *   - 9 one-digit digits: n=2, length=2, base=10.
 *   - offset 0 → number 10, position 1 → '0'. Return 0.
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
var findNthDigit = function (n) {
  let digitLength = 1;
  let numbersCount = 9;
  let baseNumber = 1;

  while (n > digitLength * numbersCount) {
    n -= digitLength * numbersCount;
    digitLength++;
    numbersCount *= 10;
    baseNumber *= 10;
  }

  let offsetInBlock = Math.floor((n - 1) / digitLength);

  let targetNumber = baseNumber + offsetInBlock;

  let digitPositionInNumber = (n - 1) % digitLength;

  let targetNumberString = String(targetNumber);

  let digitCharacter = targetNumberString[digitPositionInNumber];

  return +digitCharacter;
};
