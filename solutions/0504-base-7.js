/**
 * Base 7
 * Intuition: Repeated remainder-by-7 yields base-7 digits from least to most significant. Track the sign separately, then reverse the digit list into a string.
 * Approach: 1. Return `"0"` if `num === 0`. 2. If negative, set `isNegativeValue` and work with `absoluteNumber`. 3. While `currentNumber > 0`, push `currentNumber % 7` and divide by 7. 4. Reverse-join digits and prefix `-` when needed.
 * Dry Run: num = -8.
 *   - absolute=8 → remainders 1 then 1 (8=1*7+1). Reverse → "11". Prefix `-` → "-11".
 * Time Complexity: O(log|num|)
 * Space Complexity: O(log|num|)
 */
var convertToBase7 = function (num) {
  if (num === 0) {
    return "0";
  }

  let isNegativeValue = false;
  let absoluteNumber = num;

  if (num < 0) {
    isNegativeValue = true;
    absoluteNumber = -num;
  }

  let base7Digits = [];
  let currentNumber = absoluteNumber;

  while (currentNumber > 0) {
    let digitRemainder = currentNumber % 7;
    base7Digits.push(digitRemainder);
    currentNumber = Math.floor(currentNumber / 7);
  }

  let resultString = base7Digits.reverse().join("");

  if (isNegativeValue) {
    return "-" + resultString;
  } else {
    return resultString;
  }
};
