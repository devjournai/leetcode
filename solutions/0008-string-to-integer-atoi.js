/**
 * String To Integer Atoi
 * Intuition: Skip leading spaces, read an optional sign, then accumulate digits while checking against INT_MAX/10 so a 32-bit overflow can clamp immediately; apply `signMultiplier` at the end.
 * Approach: 1. Advance `indexTracker` past spaces. 2. If `+` or `-`, set `signMultiplier` and move forward. 3. While the current char is a digit, convert with char codes. 4. If `numericValue` would overflow (greater than floor(INT_MAX/10), or equal and digit > 7), return INT_MAX or INT_MIN. 5. Multiply by the sign and clamp once more before returning.
 * Dry Run: inputString = "  -42".
 *   - skip spaces, see '-', signMultiplier=-1. Digits 4 then 2 → numericValue=42 → finalResult=-42.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var myAtoi = function (inputString) {
  const stringLength = inputString.length;
  let indexTracker = 0;
  let signMultiplier = 1;
  let numericValue = 0;

  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  while (indexTracker < stringLength && inputString[indexTracker] === " ") {
    indexTracker++;
  }

  if (
    indexTracker < stringLength &&
    (inputString[indexTracker] === "+" || inputString[indexTracker] === "-")
  ) {
    signMultiplier = inputString[indexTracker] === "-" ? -1 : 1;
    indexTracker++;
  }

  while (
    indexTracker < stringLength &&
    inputString[indexTracker] >= "0" &&
    inputString[indexTracker] <= "9"
  ) {
    const digit = inputString[indexTracker].charCodeAt(0) - "0".charCodeAt(0);

    if (
      numericValue > Math.floor(INT_MAX / 10) ||
      (numericValue === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return signMultiplier === 1 ? INT_MAX : INT_MIN;
    }

    numericValue = numericValue * 10 + digit;
    indexTracker++;
  }

  const finalResult = signMultiplier * numericValue;

  if (finalResult < INT_MIN) {
    return INT_MIN;
  } else if (finalResult > INT_MAX) {
    return INT_MAX;
  } else {
    return finalResult;
  }
};
