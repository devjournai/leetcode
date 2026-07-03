/**
 * Maximum Difference By Remapping A Digit
 * Intuition: To maximize a number, identify the first digit from the left that is not '9'. Replacing all occurrences of this digit with '9' will yield the largest possible number. If all digits are '9', the number cannot be increased. Conversely, to minimize a number, identify the first digit from the left that is not '0'. Replacing all occurrences of this digit with '0' will yield the smallest possible number. If all digits are '0', the number cannot be decreased.
 * Approach: 1. Convert the input integer `num` into a string `numStringRepresentation` for digit-wise manipulation. 2. To compute the maximum remapped value (`maximumValue`): Iterate through `numStringRepresentation` to find the `firstNonNineDigit`. If found, create a new string by replacing all instances of `firstNonNineDigit` with '9'. If no such digit exists (meaning `numStringRepresentation` consists only of '9's), the string remains unchanged. Convert this new string to a number. 3. To compute the minimum remapped value (`minimumValue`): Use `Array.prototype.find` on the split `numStringRepresentation` to locate the `firstNonZeroDigit`. If found, create another new string by replacing all instances of `firstNonZeroDigit` with '0'. If no such digit exists (meaning `numStringRepresentation` consists only of '0's), the string remains unchanged. Convert this second new string to a number. 4. Return the difference between `maximumValue` and `minimumValue`.
 * Dry Run: num = 118
 *   1. numStringRepresentation = "118"
 *   2. Calculate maximum value:
 *      - Initialize firstNonNineDigit to null.
 *      - Begin first for loop (digitIndex from 0):
 *        - digitIndex = 0: currentCharacter is '1'. '1' !== '9' is true. Set firstNonNineDigit = '1'. Break loop.
 *      - Since firstNonNineDigit is '1', maxValueString = numStringRepresentation.replaceAll('1', '9') which results in "998".
 *      - maximumValue = Number("998") which is 998.
 *   3. Calculate minimum value:
 *      - stringDigitsArray = ["1", "1", "8"].
 *      - Use Array.prototype.find on stringDigitsArray with callback charValue => charValue !== '0'.
 *        - For "1": "1" !== "0" is true. firstNonZeroDigit is assigned "1". The find method returns.
 *      - Since firstNonZeroDigit is "1", minValueString = numStringRepresentation.replaceAll('1', '0') which results in "008".
 *      - minimumValue = Number("008") which is 8.
 *   4. Return maximumValue - minimumValue = 998 - 8 = 990.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var minMaxDifference = function (num) {
  const numStringRepresentation = String(num);

  let firstNonNineDigit = null;
  for (
    let digitIndex = 0;
    digitIndex < numStringRepresentation.length;
    digitIndex++
  ) {
    const currentCharacter = numStringRepresentation[digitIndex];
    if (currentCharacter !== "9") {
      firstNonNineDigit = currentCharacter;
      break;
    }
  }

  let maxValueString;
  if (firstNonNineDigit === null) {
    maxValueString = numStringRepresentation;
  } else {
    maxValueString = numStringRepresentation.replaceAll(firstNonNineDigit, "9");
  }
  const maximumValue = Number(maxValueString);

  const stringDigitsArray = numStringRepresentation.split("");
  const firstNonZeroDigit = stringDigitsArray.find(
    (charValue) => charValue !== "0",
  );

  let minValueString;
  if (firstNonZeroDigit === undefined) {
    minValueString = numStringRepresentation;
  } else {
    minValueString = numStringRepresentation.replaceAll(firstNonZeroDigit, "0");
  }
  const minimumValue = Number(minValueString);

  return maximumValue - minimumValue;
};
