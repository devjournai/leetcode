/**
 * Plus One
 * Intuition: Adding one only flips trailing 9s to 0 and increments the first non-9 from the right. If every digit is 9, the result is 1 followed by n zeros.
 * Approach: 1. Scan from the last digit. 2. If a digit is under 9, increment it and return. 3. Otherwise set it to 0 and continue. 4. If the loop finishes, allocate length+1, set the first cell to 1, and return that array.
 * Dry Run: digits = [1, 9, 9].
 *   - Last 9 → 0; next 9 → 0; 1 < 9 → becomes 2. Return [2, 0, 0].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var plusOne = function (digits) {
  let arrayLength = digits.length;

  for (
    let currentDigitIndex = arrayLength - 1;
    currentDigitIndex >= 0;
    currentDigitIndex--
  ) {
    if (digits[currentDigitIndex] < 9) {
      digits[currentDigitIndex]++;
      return digits;
    }
    digits[currentDigitIndex] = 0;
  }

  let extendedResult = new Array(arrayLength + 1).fill(0);
  extendedResult[0] = 1;
  return extendedResult;
};
